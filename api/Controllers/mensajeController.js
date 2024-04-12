const sendMsg = async (req, res, Mensaje) => {
  try {
    const { userId, centerId, chatId, text } = req.body;

    // Verificar que se proporcione al menos un identificador de emisor
    if (!userId && !centerId) {
      return res.status(400).json({error: 'Se requiere un identificador de usuario o centro.'});
    } 

    // Crear el mensaje
    const newMessage = await Mensaje.create({
      text,
      date: new Date(),  // Asumiendo que quieres capturar el momento de creación del mensaje
      userId,  // Este será null si no se proporcionó
      centerId,  // Este será null si no se proporcionó
      chatId
    });

    res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({error: error.message});
  }
};

module.exports = {
  sendMsg
};