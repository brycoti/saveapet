const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const { Pet } = require('../Models/petModel');
const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo";

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

    res.status(201).json({ message: { id: center.id, name: center.name, email: center.email, phonenumber: center.phonenumber, web: center.web, city: center.city, addres: center.address } }); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
}

const newPet = async (req, res, next, Center, Pet) => {
  try {
    const center = await Center.findByPk(req.id); // Cerca l'usuari pel seu ID

      console.log(center)

      if (!center){
        return res.status(400).json({ error: 'Center no trobat' }); // Retorna error 500 si no es troba l'usuari
      }
      const { name, breed, age, size, temper, dogs_friendly, kids_friendly, urgency } = req.body;
      if (!name || !breed || !age) {
        return res.status(400).json({ error: 'todos los campos son necesarios' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
      }
      const item = await Pet.create({
        name,
        breed,
        age,
        size,
        temper,
        dogs_friendly,
        kids_friendly,
        urgency,
        CenterId: req.userId
      })
      res.status(201).json(item); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
    } catch (error) {
      res.status(500).json({ error: error.message}); // Retorna error 500 amb el missatge d'error
    }
  }
  const login2 = async (req, res, Model) => {
    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ where: { email } }); // Cerca l'usuari pel seu email
        if (!user) {
          return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
        }
        const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
        }
        const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
        res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
        res.json({ name: user.name, id: user.id, email: user.email, phonenumber : user.phonenumber, web: user.web, city: user.city, address: user.address}); // Retorna missatge d'èxit
      } catch (error) {

    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
}
  module.exports = {
    registerCenter,
    newPet,
    login2
  }