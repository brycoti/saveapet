const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const { checkToken } = require('../Middleware/checkToken');
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers

// Models
const { Center, Pet, UserPetMatch, User } = require('../Models/models'); // Correct way to import the User model if it's part of an exported object

// Controllers
const { createItem, updateItem, deleteItem, readItem, readItems } = require('../Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { registerCenter, login2, centerAnimal, animalLikedByUsers, adopt,  } = require('../Controllers/centerController')


// CRUD CENTER

// Endpoint per registrar un Centre
router.post('/register/center', async (req, res) => await registerCenter(req, res, Center));
router.post('/login/center', async (req, res) => await login2(req, res, Center));

router.get('/centers', checkToken, async (req, res) => await readItems(req, res, Center));
router.get('/centers/:id', checkToken, async (req, res) => await readItem(req, res, Center));
router.put('/centers/:id', checkToken, async (req, res) => await updateItem(req, res, Center));
router.delete('/centers/:id', checkToken, async (req, res) => await deleteItem(req, res, Center));

router.get('/centers/:id/animals', checkToken, async (req, res) => await centerAnimal(req, res, Center, Pet));

// devuelve todos los likes con valor true de users
router.get('/center/petmatches', checkToken, async (req, res) => await readItems(req, res, UserPetMatch));

// devuelve el id de un perro con los likes con valor true de users del mismo centro id
router.get('/center/petmatches/:id', checkToken, async (req, res) => await animalLikedByUsers(req, res, UserPetMatch, User));
router.post('/adopt', async (req, res) => await adopt(req, res, User, Pet, UserPetMatch));
module.exports = router; // Exporta el router amb les rutes definides