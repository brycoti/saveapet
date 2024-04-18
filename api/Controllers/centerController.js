const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
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
/*
const newPet = async (req, res, next, Center, Pet) => {
  // Create multer instance specific for this function
  const upload = multer({ storage: storage }).single('foto');

  // Use the multer instance to handle the file upload
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: err.message });
    }

    // No errors during upload, proceed with the rest of the logic
    try {
      const center = await Center.findByPk(req.userId);

      if (!center) {
        return res.status(400).json({ error: 'Center not found' });
      }

      const { name, breed, age, size, temper, dogs_friendly, kids_friendly, urgency } = req.body;
      if (!name || !breed || !age) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (req.file) {
        req.body.foto = req.file.filename; // Assigns the uploaded file name to 'foto' field
      }

      const item = await Pet.create({
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
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
*/
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
    fileSize: 1024 * 1024 * 5 // 5MB limit
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


      console.log(pet)

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


const animalLikedByUsers = async (req, res, UserPetMatch, Pet) => {
  try {
    const petId = req.params.petId;

    // Retrieve the pet and associated center with likes
    const pet = await Pet.findOne({
      where: { id: petId },
      include: [
        {
          model: Center,
          attributes: ['id']
        },
        {
          model: UserPetMatch,
          as: 'likes',  // Use the alias defined in the association
          attributes: ['userId'],
          where: { liked: true }
        }
      ]
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const userIds = pet.likes.map(like => like.userId);

    // Prepare the response object
    const result = {
      pet: pet,  // This now includes likes embedded within
    };

    res.json(result);
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