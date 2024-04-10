const userChat = async (req, res, Chat) => {
    try {
      const { userId, centerId, contenido } = req.body;
        const mensaje = await Chat.create({
            userId,
            centerId,
            contenido
        });
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(400).send(error.message);
    }
 }


 const centerChat = async (req, res, Chat) => {
    const { centerId, userId, contenido} = req.body;
  
    try {
        const mensaje = await Chat.create({
            userId,
            centerId,
            contenido
        });
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(400).send(error.message);
    }
 }



 module.exports = {
    userChat,
    centerChat
  }