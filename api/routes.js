const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken'); // Importa la llibreria jsonwebtoken per a generar i verificar JWT

const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo"; // Clau secreta per a la generació de JWT

const { User } = require('./models'); // Correct way to import the User model if it's part of an exported object

const {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsUser,
} = require('./generics'); // Importa les funcions per a realitzar operacions CRUD genèriques

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
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Obté l'email i la contrasenya de la petició
    try {
      const user = await User.findOne({ where: { email } }); // Cerca l'usuari pel seu email
      if (!user) {
        return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
      }
      const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
      }
      const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
      res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
      res.json({ name: user.name, id: user.id }); // Retorna missatge d'èxit
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
  });
  

// Endpoint per registrar un usuari
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body; // Get name, email, and password from the request body

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password required' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({ name, email, password: hashedPassword });

        // Return the created user (consider excluding the password from the response)
        const userResponse = { ...user.toJSON(), password: undefined }; // Removing password from the response
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/refresh', checkToken, async (req, res) => {
    const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu email
    if (!user) {
        return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
    }
    return res.json({ id: user.id, name: user.name, email: user.email })
})

module.exports = router; // Exporta el router amb les rutes definides