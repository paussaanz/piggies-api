const Notification = require("../models/Notification.model");

module.exports.getNotifications = async (req, res) => {
  try {
      const { userId } = req.params;
      
      const notifications = await Notification.find({ userId })
          .populate('taskId')
          .populate("userId");

      // console.log("NOTIFICATIONS:", notifications);
      res.json(notifications);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
  }
};

module.exports.markNotificationsAsRead = async (req, res) => {
  try {
      const { userId } = req.params;

      await Notification.updateMany(
          { userId, read: false },
          { $set: { read: true } }
      );

      res.send('Notifications marked as read');
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
};
 
/*COMM: ESTE CONTROLADOR FUNCIONAA */
//   module.exports.createNotifications = async (req, res) => {
//     try {
//       const { users, taskId, added } = req.body; 
      
//       if (!users.length || !taskId) {
//         return res.status(400).send('La solicitud falta de datos necesarios.');
//       }

//       const isAdding = added === 'true' || added === true; 

//       const notificationPromises = users.map(userId => {
//         const notification = new Notification({
//           userId,
//           taskId,
//           added: isAdding,
//         });
  
//         return notification.save();
//       });
  
//       await Promise.all(notificationPromises)
//         .then(results => {
//           const message = isAdding ? "Usuarios añadidos a la tarea." : "Usuarios eliminados de la tarea.";
//           res.status(201).json({ message, results });
//         });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error del servidor al crear la notificación');
//     }
// };


module.exports.createNotifications = async (req, res) => {
  try {
    const { users, taskId, action, status } = req.body;
    
    if (!users.length || !taskId) {
      return res.status(400).send('La solicitud falta de datos necesarios.');
    }

    const notificationPromises = users.map(userId => {
      let message;

      switch(action) {
        case 'add':
          message = "You have been added to a new task.";
          break;
        case 'remove':
          message = "You have been deleted from a task.";
          break;
        case 'statusChange':

        const statusMessage = status ? 'done' : 'pending';
          message = `A task you were working on has been marked as ${statusMessage}.`;
          break;
        default:
          throw new Error('Acción no válida');
      }

      const notification = new Notification({
        userId,
        taskId,
        message,
        action,
        status, 
      });

      return notification.save();
    });

    await Promise.all(notificationPromises).then(results => {

      res.status(201).json({ message: "Notificaciones creadas exitosamente.", results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor al crear la notificación');
  }
};



  