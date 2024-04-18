const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const { Pet } = require('../Models/petModel');
const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo";


// Configuració de multer per gestionar la pujada de fitxers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend_desk/public/img') // Especifica la carpeta de destinació dels fitxers pujats
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`) // Assigna un nom únic als fitxers pujats
  }
})

const upload = multer({ storage: storage }).single('foto'); // Configura multer per a gestionar la pujada d'un únic fitxer amb el camp 'foto'




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

    res.status(201).json({ message: { userId: center.id, name: center.name, email: center.email,
    phonenumber: center.phonenumber, web: center.web, city: center.city, addres: center.address } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const newPet = async (req, res, next, Center, Pet) => {
  try {
    const center = await Center.findByPk(req.userId);

    if (!center){
      return res.status(400).json({ error: 'Center no trobat' });
    }

    const { name, breed, age, size, temper, dogs_friendly, kids_friendly, urgency } = req.body;
    if (!name || !breed || !age) {
    return res.status(400).json({ error: 'todos los campos son necesarios' });
    }

  
    if (req.file) {
        req.body.foto = req.file.filename; // Assigna el nom del fitxer pujat al camp 'foto'
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
    })
  res.status(201).json(item);
} catch (error) {
    res.status(500).json({ error: error.message});
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
        res.json({ userName: user.name, userId: user.id, email: user.email, phonenumber : user.phonenumber, web: user.web, city: user.city, address: user.address}); // Retorna missatge d'èxit
      } catch (error) {

    res.status(500).json({ error: error.message });
  }
}
  module.exports = {
    registerCenter,
    newPet,
    login2
  }