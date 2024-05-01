const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express

const { checkToken } = require('../Middleware/checkToken'); 

// Models
const { User, Center } = require('../Models/models'); // Correct way to import the User model if it's part of an exported object

// Endpoint per finalitzar sessio
router.delete('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie
    res.status(200).json({ message: 'Logged out' }); // Retorna missatge d'èxit
  });
  
  // endpoint para refrescar el token
  router.get('/refresh', checkToken, async (req, res) => {
    const user = await User.findByPk(req.userId); 
    if (!user) {
      return res.status(404).json({ error: 'User no trobat' });
    }
    return res.json({ userId: user.id, name: user.name, email: user.email })
  })

  router.get('/refresh/center', checkToken, async (req, res) => {
    const user = await Center.findByPk(req.userId); 
    if (!user) {
      return res.status(404).json({ error: 'User no trobat' });
    }
    return res.json({ userName: user.name, userId: user.id, email: user.email, phonenumber : user.phonenumber, web: user.web, city: user.city, address: user.address})
  })

  module.exports = router; // Exporta el router amb les rutes definides