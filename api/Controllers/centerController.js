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
    cb(null, '../frontend_desk/public/img') // Especifica la carpeta de destino de los archivos subidos
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


     // Ruta a la segunda ubicación donde también quieres guardar la imagen
     const additionalPath = '../frontend/public/img/' + req.file.filename;


    // No hay errores de carga, proceder con la lógica de negocio
    try {
       // Copiar el archivo a la segunda ubicación
       await fs.copyFile(req.file.path, additionalPath);

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
      attributes: ['name', 'address', 'email','phonenumber']
    });

    res.json(likedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  registerCenter,
  newPet,
  login2,
  centerAnimal,
  animalLikedByUsers
}