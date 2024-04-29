const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

const { where } = require("sequelize");
const { Pet } = require('../Models/petModel');
const { UserPetMatch } = require('../Models/userPetMatchModel');
const { Center } = require('../Models/centerModel');
const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo";


const registerCenter = async (req, res, Center) => {
  try {
    const { name, email, password, phonenumber, web, city, address } = req.body;

    if (!name || !email || !password, !phonenumber, !web, !city, !address) {
      return res.status(400).json({ error: ' Company name, email, password, phonenumber, web, city y addres requerits' });
    }

    const existingCenter = await Center.findOne({ where: { email } });

    if (existingCenter) {
      return res.status(400).json({ error: 'Email ja existeix' });
    }

    const center = await Center.create({ name, email, password, phonenumber, web, city, address });

    res.status(201).json({
      message: {
        userId: center.id, name: center.name, email: center.email,
        phonenumber: center.phonenumber, web: center.web, city: center.city, addres: center.address
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const login2 = async (req, res, Model) => {
  try {
    const { email, password } = req.body;

    const user = await Model.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User no trobat' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password incorrecte' });
    }
    const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
    res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
    res.json({ userName: user.name, userId: user.id, email: user.email, phonenumber: user.phonenumber, web: user.web, city: user.city, address: user.address }); // Retorna missatge d'èxit
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

// Configuración de multer para guardar imágenes en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads') // Especifica la carpeta de destino de los archivos subidos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueSuffix + '_' + file.originalname) // Asigna un nombre único a los archivos subidos
  }
});

const fileFilter = (req, file, cb) => {
  // Aceptar solo archivos de imagen
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 320 * 256 * 4 // 4MB limit
  }
}).single('foto');

const newPet = async (req, res, next, Center, Pet) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Errores específicos de multer
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // Otros errores desconocidos
      return res.status(500).json({ error: err.message });
    }

    // No hay errores de carga, proceder con la lógica de negocio
    try {
       

      const center = await Center.findByPk(req.userId);
      if (!center) {
        return res.status(400).json({ error: 'Center not found' });
      }

      const { name, breed, age, size, temper, dogs_friendly, kids_friendly, urgency } = req.body;
      if (!name || !breed || !age) {
        return res.status(400).json({ error: 'Name, breed, and age are required' });
      }

      if (req.file) {
        req.body.foto = req.file.filename; // Asignar el nombre del archivo subido al campo 'foto'
      }

      const pet = await Pet.create({
        name,
        breed,
        age,
        size,
        temper,
        dogs_friendly,
        kids_friendly,
        urgency,
        CenterId: req.userId,
        foto: req.body.foto
      });

      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const centerAnimal = async (req, res, Center, Pet) => {
  try {
    const centerId = req.params.id; // Obtener el ID del centro del token verificado
    
    // Verificar si el centro existe
    const center = await Center.findByPk(centerId);
    if (!center) {
      return res.status(404).json({ error: 'Centro no encontradovv' });
    }

    // El centro existe, ahora podemos buscar los animales asociados a él
    const animales = await Pet.findAll({ where: { CenterId: centerId } }); // Buscar animales asociados al centro
    res.json(animales); // Enviar los animales al cliente
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejar errores
  }
};


const animalLikedByUsers = async (req, res,  UserPetMatch, User ) => {
  try {
    const petId = req.params.id;

    // Recuperar los IDs de los usuarios que han dado like al animal
    const likedUserMatches = await UserPetMatch.findAll({
      where: { petId: petId, liked: true, watched: true },
      attributes: ['userId'] // la columna que devuelve
    });

    // Extraer los IDs de usuario de los matches
    const likedUserIds = likedUserMatches.map(match => match.userId);

    // Recuperar información de los usuarios que han dado like al animal
    const likedUsers = await User.findAll({
      where: { id: likedUserIds },
      attributes: ['name', 'address', 'email','phonenumber','id','home','other_pets','age_range','kids_at_home','ill_pets']
    });

    res.json(likedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const adopt = async (req, res,User,Pet,UserPetMatch) => {
  try {
      const { userId, petId } = req.body;

      // Verifica si el usuario existe
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ error: 'El usuario no existe.' });
      }

      // Verifica si el animal existe
      const pet = await Pet.findByPk(petId);
      if (!pet) {
          return res.status(404).json({ error: 'El animal no existe.' });
      }

      // Busca la entrada en la tabla intermedia que coincida con los IDs del usuario y del animal
      const userPetMatch = await UserPetMatch.findOne({
          where: { userId: userId, petId: petId }
      });

      // Verifica si se encontró una coincidencia en la tabla intermedia
      if (!userPetMatch) {
          return res.status(404).json({ error: 'No se encontró una coincidencia en la tabla intermedia.' });
      }
      if (userPetMatch.adopted) {
        return res.status(404).json({error:"El animal ya ha sido adoptado"})
      }
      // Actualiza el atributo 'adopted' de la entrada encontrada a 'true'
      await userPetMatch.update({ adopted: true });

      // Envía una respuesta de éxito
      res.status(200).json({ message: 'Usuario adoptado correctamente.' });
  } catch (error) {
      console.error('Error al adoptar usuario:', error);
      res.status(500).json({ error: 'Error al procesar la adopción del usuario.' });
  }
};

const deletePet = async (req, res, Model) => {
  try {
      const item = await Model.findByPk(req.params.id);
      if (!item) {
          return res.status(404).json({ error: 'Item not found' });
      }

       // Asumiendo que 'foto' es el campo donde se almacena el nombre del archivo de la imagen
    const photoPath = path.join(__dirname, '../uploads', item.foto);

    // Elimina la imagen del sistema de archivos
    await fs.unlink(photoPath).catch(err => {
      // Maneja el caso en que el archivo no pueda ser eliminado (p.ej. no existe o problemas de permisos)
      console.error('Failed to delete the photo:', err);
      throw new Error('Failed to delete the photo');
    });


      await item.destroy();
      res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

const animalAdoptedByUsers = async (req, res,  UserPetMatch, User ) => {
  try {
    const petId = req.params.id;

    // Recuperar los IDs de los perros que han sido adoptados
    const adopted = await UserPetMatch.findAll({
      where: { petId: petId, adopted: true},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCenter,
  newPet,
  login2,
  centerAnimal,
  animalLikedByUsers,
  adopt,
  deletePet,
  animalAdoptedByUsers
}