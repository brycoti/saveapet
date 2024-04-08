const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");

const registerCenter = async (req, res, Center) => {
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
  }
  
const newPet =  async (req, res, next, Center, Pet) => {
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
  }

  module.exports = {
    registerCenter,
    newPet
  }