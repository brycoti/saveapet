const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");

const registerUser = async (req, res, User) => {
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
      res.status(500).json({ error: "Cannot create" }); // Retorna error 500 amb el missatge d'error
    }
}

const userpet = async (req, res, next, User, UsuarioPet) => {
    try {
      const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
     
     
    // console.log(user)
     
      if (!user) {
        return res.status(400).json({ error: 'Usuari no trobat' }); // Retorna error 500 si no es troba l'usuari
      }

    const { id_pet} = req.body;


      console.log(id_pet)

      if ( !id_pet ) {
        return res.status(400).json({ error: 'No hi cap gos assignat' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
      }

      const item = await UsuarioPet.create({
        UserId: req.userId,
        id_pet,
       adopted
      })
      res.status(201).json(item); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
    } catch (error) {
      res.status(500).json({ error: error.message}); // Retorna error 500 amb el missatge d'error
    }
  }

  const userandpet = async (req, res, next, User, UserPetmatch) => {
    try {
      const userId = await User.findByPk(req.userId); 
      const {id_pet } = req.body;


      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      
    
      if (!id_pet) {
        return res.status(400).json({error: 'id de cuenta pet incorrecto'}) 
      } 
      
      
      const newMatch = await UserPetmatch.create({
            userId : userId,
            id_pet,
        });
  
        res.status(201).json(newMatch);

    } catch (error) {
      console.error("Error processing request:", error);
        res.status(500).json({error: error.message});
    }
  }
  
  module.exports = {
    registerUser,
    userpet,
    userandpet
  }