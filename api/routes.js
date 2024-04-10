const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes


// Models
const { User, Center, Pet, UsuarioPet, Chat } = require('./Models/models'); // Correct way to import the User model if it's part of an exported object

// Controllers
const { createItem, updateItem, deleteItem, readItem, readItems, readItemsUser, login
} = require('./Controllers/generics'); // Importa les funcions per a realitzar operacions CRUD genèriques
const { registerUser, userpet } = require('./Controllers/userController')
const { registerCenter, newPet } = require('./Controllers/centerController')
const { userChat, centerChat } = require ('./Controllers/chatController')

// Middleware
const { checkToken } = require('./Middleware/checkToken') 



// CRUD USERS 
router.get('/users', checkToken, async (req, res) => await readItems(req, res, User));
router.get('/users/:id', async (req, res) => await readItem(req, res, User));
router.put('/users/:id', async (req, res) => await updateItem(req, res, User));
router.delete('/users/:id', async (req, res) => await deleteItem(req, res, User));

// Endpoint per registrar un usuari
router.post('/register/user', async (req, res) => await registerUser(req, res, User));

// Endpoint per iniciar sessió d'un usuari
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
router.post('/login/center', async (req, res) => await login(req, res, Center));
router.post('/center/newpet', checkToken, async (req, res, next) => await newPet(req, res, next, Center, Pet));

// Enpoint per crear relacio user - gos
router.post('/userpet', checkToken, async (req, res, next) => await userpet(req, res, next, User, UsuarioPet));

// CHAT
// Endpoint para enviar un mensaje
router.post('/chat/send', async (req, res) => {
  const { userId, centerId, message } = req.body;

  try {
      const newMessage = await Chat.create({
          userId,
          centerId,
          message
      });

      res.status(201).json(newMessage);
  } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

// Endpoint para obtener los mensajes entre un usuario y un centro
router.get('/chat/messages', async (req, res) => {
  const { userId, centerId } = req.query;

  try {
      const messages = await Chat.findAll({
          where: {
              userId,
              centerId
          },
          order: [
              ['timestamp', 'ASC'] // Ordena los mensajes por fecha de envío
          ]
      });

      res.json(messages);
  } catch (error) {
      console.error('Error al obtener mensajes:', error);
      res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
});

module.exports = router; // Exporta el router amb les rutes definides