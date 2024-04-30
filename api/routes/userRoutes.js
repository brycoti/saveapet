const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const { checkToken } = require('../Middleware/checkToken');
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes

// Models
const { User, UserPetMatch } = require('../Models/models'); // Correct way to import the User model if it's part of an exported object

// Controllers
const { updateItem, deleteItem, readItem, readItems, readItemsUser, login, editUser } = require('../Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { registerUser, userandpet, userLikes } = require('../Controllers/userController')

// CRUD USERS 
router.get('/users', checkToken, async (req, res) => await readItems(req, res, User));
router.get('/users/:id', async (req, res) => await readItem(req, res, User));
router.put('/users/:id', async (req, res) => await updateItem(req, res, User));
router.delete('/users/:id', async (req, res) => await deleteItem(req, res, User));

router.post('/register/user', async (req, res) => await registerUser(req, res, User));
router.post('/login/user', async (req, res) => await login(req, res, User));

// Enpoint per crear relacio user - gos
router.post('/user/petmatch', checkToken, async (req, res, next) => await userandpet(req, res, next, User, UserPetMatch));
router.get('/user/petmatch', checkToken, async (req, res) => await readItemsUser(req, res, UserPetMatch));
router.get('/user/likes', checkToken, async (req, res) => await userLikes(req, res, UserPetMatch));

module.exports = router; // Exporta el router amb les rutes definides