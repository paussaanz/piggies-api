const Notification = require("../models/Notification.model");


module.exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
      const notifications = await Notification.find({ userId });
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };

  module.exports.createNotifications = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
    
        if (!userId) {
          return res.status(400).send('La solicitud falta de datos necesarios.');
        }
    
        const newNotification = new Notification({
          user: userId,
          task: taskId, 
        //   message: messageId,
        });
    
        await newNotification.save();
    
        res.status(201).json(newNotification);

      } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor al crear la notificación');
      }
  };

  