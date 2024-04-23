const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");



const registerUser = async (req, res, User) => {
    try {
      const { name, email, password, phonenumber, address } = req.body; 

      if (!name || !email || !password, !phonenumber, !address) {
        return res.status(400).json({ error: 'name, email, password, phonenumber i address requerits' }); 
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email ja existeix' }); 
      }

      const user = await User.create({ name, email, password, phonenumber, address }); 
  
      res.status(201).json({userId: user.id, name: user.name, email: user.email});
    } catch (error) {
        res.status(500).json({ error: "Cannot create" });
    }
}

  const userandpet = async (req, res, next, User, UserPetmatch) => {
    try {
      const userId = await User.findByPk(req.userId); 
      const {petId} = req.body;
      const {liked} = req.body;
      const {watched} = req.body;
      if (!userId) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      if ( !petId ) {
        return res.status(404).json({error: 'Pet not found'}) 
      } 
      
      const newMatch = await UserPetmatch.create({
        UserId: req.userId,
        PetId : petId,
        liked : liked,
        watched : watched
        });
  
        res.status(201).json(newMatch);

    } catch (error) {
      console.error("Error processing request:", error);
        res.status(500).json({error: error.message});
    }
    
  }

  const userLikes = async (req, res, Model) => {
    try {
        const item = await Model.findAll({ where: { userId: req.userId, liked: true  } })
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
  
  module.exports = {
    registerUser,
    userandpet,
    userLikes
  }