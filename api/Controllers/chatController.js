const sendChat = async (req, res, Chat, Msg) => {
    

  try {
    const { userId, centerId, contenido } = req.body;
    const newMessage = await Chat.create({
          userId,
          centerId,
          contenido
      });

      res.status(201).json(newMessage);
  } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({ contenido: 'Error al enviar el mensaje' });
  }
}

module.exports = {
    sendChat
}