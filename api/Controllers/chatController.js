const sendChat = async (req, res, Chat) => {
  try {
    const { userId, centerId, contenido } = req.body;

    if (!userId) {
      return res.status(400).json({error: 'id de cuenta user incorrecto'})
    } 

    if (!centerId) {
      return res.status(400).json({error: 'id de cuenta centro incorrecto'})
    } 
    
    
    const newChat = await Chat.create({
          userId,
          centerId,
      });

      res.status(201).json(newChat);
  } catch (error) {
      res.status(500).json({error: error.message});
  }
}

module.exports = {
    sendChat
}