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
router.post('/login/user', async (req, res) => {
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

// Endpoint per iniciar sessió d'un centre
router.post('/login/center',  async (req, res) => {
  const { email, password } = req.body; // Obté l'email i la contrasenya de la petició
  try {
    const center = await Center.findOne({ where: { email } }); // Cerca l'usuari pel seu email
    if (!center) {
      return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
    }
    const passwordMatch = await bcrypt.compare(password, center.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
    }
    const token = jwt.sign({ userId: center.id, userName: center.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
    res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
    res.json("Login correcte"); // Retorna missatge d'èxit
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
});

// Endpoint per finalitzar sessio
  router.delete('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie
    res.status(200).json({ message: 'Logged out' }); // Retorna missatge d'èxit
  });


// Endpoint per registrar un usuari
router.post('/register/user', async (req, res) => {
    try {
      const { name, email, password, phonenumber, address } = req.body; // Obté el nom, email i contrasenya de la petició
      if (!name || !email || !password, !phonenumber, !address) {
        return res.status(400).json({ error: 'name, email, password, phonenumber i address requerits' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
      }
      const existingUser = await User.findOne({ where: { email } }); // Comprova si l'email ja està registrat
      if (existingUser) {
        return res.status(400).json({ error: 'Email ja existeix' }); // Retorna error 400 si l'email ja està registrat
      }
      const user = await User.create({ name, email, password, phonenumber,address }); // Crea l'usuari amb les dades proporcionades
  
      res.status(201).json({id: user.id, name: user.name, email: user.email}); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
  });

// Endpoint per registrar un Centre
router.post('/register/center', async (req, res) => {
  try {
    const { name, email, password, phonenumber, web, city, address } = req.body; // Obté el nom, email i contrasenya de la petició
    if (!name || !email || !password, !phonenumber, !web, !city, !address) {
      return res.status(400).json({ error: ' Company name, email, password, phonenumber, web, city y addres requerits' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
    }
    const existingCenter = await Center.findOne({ where: { email } }); // Comprova si l'email ja està registrat
    if (existingCenter) {
      return res.status(400).json({ error: 'Email ja existeix' }); // Retorna error 400 si l'email ja està registrat
    }
    const center = await Center.create({ name, email, password, phonenumber, web, city, address }); // Crea l'usuari amb les dades proporcionades

    res.status(201).json({message: {id: center.id, name: center.name, email: center.email, phonenumber : center.phonenumber, web: center.web, city: center.city, addres: center.addres}}); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
});

router.post('/center/newpet', checkToken, async (req, res, next) => {
  try {
    const center = await Center.findByPk(req.userId); // Cerca l'usuari pel seu ID
    if (!center) {
      return res.status(500).json({ error: 'Center no trobat' }); // Retorna error 500 si no es troba l'usuari
    }
    const { name, breed, age } = req.body;
    if (!name || !breed || !age) {
      return res.status(400).json({ error: 'Nom issue, tipus i ID projecte requerit' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
    }
    const item = await Pet.create({
      name,
      breed,
      age,
      CenterId: req.userId
    })
    res.status(201).json(item); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
  } catch (error) {
    res.status(500).json({ error: error.message}); // Retorna error 500 amb el missatge d'error
  }
});

router.post('/userpet', checkToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
    if (!user) {
      return res.status(500).json({ error: 'Usuari no trobat' }); // Retorna error 500 si no es troba l'usuari
    }
    const { id_pet } = req.body;
    if ( !id_pet ) {
      return res.status(400).json({ error: 'No hi cap gos assignat' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
    }
    const item = await UsuarioPet.create({
      id_user: req.userId,
      id_pet,
    })
    res.status(201).json(item); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
  } catch (error) {
    res.status(500).json({ error: error.message}); // Retorna error 500 amb el missatge d'error
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