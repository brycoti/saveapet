const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes


// Models
const { User, Center, Pet, UserPetMatch } = require('./Models/models'); // Correct way to import the User model if it's part of an exported object

// Controllers
const { createItem, updateItem, deleteItem, readItem, readItems, readItemsUser, login
} = require('./Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { registerUser, userandpet } = require('./Controllers/userController')
const { registerCenter, newPet ,login2} = require('./Controllers/centerController')


// Middleware
const { checkToken } = require('./Middleware/checkToken'); 

// CRUD USERS 
router.get('/users', checkToken, async (req, res) => await readItems(req, res, User));
router.get('/users/:id', async (req, res) => await readItem(req, res, User));
router.put('/users/:id', async (req, res) => await updateItem(req, res, User));
router.delete('/users/:id', async (req, res) => await deleteItem(req, res, User));

router.post('/register/user', async (req, res) => await registerUser(req, res, User));
router.post('/login/user', async (req, res) => await login(req, res, User));


// Endpoint per finalitzar sessio
router.delete('/logout', (req, res) => {
res.clearCookie('token'); // Elimina la cookie
res.status(200).json({ message: 'Logged out' }); // Retorna missatge d'èxit
});

router.get('/refresh', checkToken, async (req, res) => {
const user = await User.findByPk(req.userId); 
  if (!user) {
    return res.status(404).json({ error: 'User no trobat' });
  }
  return res.json({ id: user.id, name: user.name, email: user.email })
})

// CRUD CENTER

// Endpoint per registrar un Centre
router.post('/register/center', async (req, res) => await registerCenter(req, res, Center));
router.post('/login/center', async (req, res) => await login2(req, res, Center));

router.get('/centers', checkToken, async (req, res) => await readItems(req, res, Center));
router.get('/centers/:id', checkToken , async (req, res) => await readItem(req, res, Center));
router.put('/centers/:id', checkToken,  async (req, res) => await updateItem(req, res, Center));
router.delete('/centers/:id', checkToken, async (req, res) => await deleteItem(req, res, Center));


// CRUD PET

router.post('/center/newpet', checkToken, async (req, res, next) => await newPet(req, res, next, Center, Pet));
router.get('/pets', checkToken, async (req, res) => await readItems(req, res, Pet));
router.get('/pets/:id', checkToken, async (req, res) => await readItem(req, res, Pet));
router.put('/pets/:id', checkToken, async (req, res) => await updateItem(req, res, Pet));
router.delete('/pets/:id', checkToken, async (req, res) => await deleteItem(req, res, Pet));

// Enpoint per crear relacio user - gos

router.post('/user/petmatch', checkToken, async (req, res, next) => await userandpet(req, res, next, User, UserPetMatch));
 

module.exports = router; // Exporta el router amb les rutes definides