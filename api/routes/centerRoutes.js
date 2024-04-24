const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const { checkToken } = require('../Middleware/checkToken'); 

const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers


// Models
const {Center,Pet, UserPetMatch,User} = require('../Models/models'); // Correct way to import the User model if it's part of an exported object

// Controllers
const { createItem, updateItem, deleteItem, readItem, readItems} = require('../Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { registerCenter, login2, centerAnimal, animalLikedByUsers} = require('../Controllers/centerController')

/*
// Configuració de multer per gestionar la pujada de fitxers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../front/public/img') // Especifica la carpeta de destinació dels fitxers pujats
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`) // Assigna un nom únic als fitxers pujats
    }
  })
  
  const upload = multer({ storage: storage }).single('foto'); // Configura multer per a gestionar la pujada d'un únic fitxer amb el camp 'foto'
  
  
  upload(req, res, async function (err) { // Gestiona la pujada del fitxer
    if (err) {
      return res.status(500).json({ error: err.message }); // Retorna error 500 si hi ha algun error en la pujada del fitxer
    }
    if (req.file) {
      req.body.foto = req.file.filename; // Assigna el nom del fitxer pujat al camp 'foto'
    }
    // IMPORTANT! user.createBolet() és una "funció"
    // de sequelize que automàticament vincula el Bolet creat amb l'usuari user
    const item = await user.createBolet(req.body); // Crea un nou bolet PER A L'USUARI ACTUAL amb les dades rebudes
    res.status(201).json(item); // Retorna l'objecte del bolet creat amb el codi d'estat 201 (Creat)
  });

*/


// CRUD CENTER

// Endpoint per registrar un Centre
router.post('/register/center', async (req, res) => await registerCenter(req, res, Center));
router.post('/login/center', async (req, res) => await login2(req, res, Center));

router.get('/centers', checkToken, async (req, res) => await readItems(req, res, Center));
router.get('/centers/:id', checkToken , async (req, res) => await readItem(req, res, Center));
router.put('/centers/:id', checkToken,  async (req, res) => await updateItem(req, res, Center));
router.delete('/centers/:id', checkToken, async (req, res) => await deleteItem(req, res, Center));

router.get('/centers/:id/animals', checkToken, async (req, res) => await centerAnimal(req, res, Center,Pet));

// devuelve todos los likes con valor true de users
router.get('/center/petmatches', checkToken, async (req, res) => await readItems(req, res, UserPetMatch)); 

// devuelve el id de un perro con los likes con valor true de users del mismo centro id
router.get('/center/petmatches/:id', checkToken, async (req, res) => await animalLikedByUsers(req, res, UserPetMatch, User));
module.exports = router; // Exporta el router amb les rutes definides