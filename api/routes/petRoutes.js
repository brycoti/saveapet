const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const { checkToken } = require('../Middleware/checkToken');

// Models
const { Center, Pet } = require('../Models/models');

// Controllers
const { updateItem, deleteItem, readItem, readItems } = require('../Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { newPet, deletePet, animalAdoptedByUsers } = require('../Controllers/centerController')

// CRUD PET
router.post('/center/newpet', checkToken, async (req, res, next) => await newPet(req, res, next, Center, Pet));
router.get('/pets', async (req, res) => await readItems(req, res, Pet));
router.get('/pets/:id', checkToken, async (req, res) => await readItem(req, res, Pet));
router.put('/pets/:id', checkToken, async (req, res) => await updateItem(req, res, Pet));
router.delete('/pets/:id', checkToken, async (req, res) => await deletePet(req, res, Pet));
router.get('/pets/adoptions', async (req, res) => await animalAdoptedByUsers(req, res, UserPetMatch));

module.exports = router; // Exporta el router amb les rutes definides