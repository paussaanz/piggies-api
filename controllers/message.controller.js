 const Message = require("../models/Message.model");

module.exports.getMessageHistory = (req, res, next) => {
    const { room } = req.params;
    Message.find({ room }).sort({ createdAt: 1 })
    .then(messages => {
        res.json(messages);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error al obtener mensajes');
    });
}

module.exports.uploadImage = (req, res, next) => {
    if (req.file) {
        res.json({ imageUrl: req.file.path });
      } else {
        res.status(500).json({ error: 'No se pudo subir la imagen' });
      }
}

