const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken'); // Importa la llibreria jsonwebtoken per a generar i verificar JWT

const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo"; // Clau secreta per a la generació de JWT

const { User,Center,Pet,UsuarioPet } = require('./models'); // Correct way to import the User model if it's part of an exported object

const {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsUser,
    login
} = require('./generics'); // Importa les funcions per a realitzar operacions CRUD genèriques

const { 
  registerUser,
  userpet
 } = require('./userFunctions')
const { 
  registerCenter,
  newPet
 } = require('./centerFunctions')

// Middleware per verificar el JWT en la cookie
const checkToken = (req, res, next) => {
    const token = req.cookies?.token; // Obté el token des de la cookie de la petició
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // Retorna error 401 si no hi ha cap token
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
        req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
        next(); // Passa al següent middleware
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' }); // Retorna error 401 si el token és invàlid
    }
};



router.get('/users', checkToken, async (req, res) => await readItems(req, res, User));
router.get('/users/:id', async (req, res) => await readItem(req, res, User));
router.put('/users/:id', async (req, res) => await updateItem(req, res, User));
router.delete('/users/:id', async (req, res) => await deleteItem(req, res, User));

// Endpoint per iniciar sessió d'un usuari
router.post('/login/user', async (req, res) => await login(req, res, User));
router.post('/login/center', async (req, res) => await login(req, res, Center));

// Endpoint per finalitzar sessio
  router.delete('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie
    res.status(200).json({ message: 'Logged out' }); // Retorna missatge d'èxit
  });


// Endpoint per registrar un usuari
router.post('/register/user', async (req, res) => await registerUser(req, res, User));

// Endpoint per registrar un Centre
router.post('/register/center', async (req, res) => await registerCenter(req, res, Center));
router.post('/center/newpet', checkToken, async (req, res, next) => await newPet(req, res, next, Center, Pet));

// Enpoint per crear relacio user - gos
router.post('/userpet', checkToken, async (req, res, next) => await userpet(req, res, next, User, UsuarioPet));

router.get('/refresh', checkToken, async (req, res) => {
    const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu email
    if (!user) {
        return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
    }
    return res.json({ id: user.id, name: user.name, email: user.email })
})

router.post('/chat/usertocenter', async (req, res) => {
    const { userId, centerId, contenido } = req.body;
  
    try {
        const mensaje = await Chat.create({
            userId,
            centerId,
            contenido
        });
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(400).send(error.message);
    }
  });
  
  
  // TODO corregir bug validation
  router.post('/chat/centertouser', async (req, res) => {
    const { centerId, userId, contenido} = req.body;
  
    try {
        const mensaje = await Chat.create({
            userId,
            centerId,
            contenido
        });
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(400).send(error.message);
    }
  });
  


module.exports = router; // Exporta el router amb les rutes definides