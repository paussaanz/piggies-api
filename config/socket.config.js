const { Server } = require("socket.io");
const Message = require('../models/Message.model');

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('authenticate', (token) => {
            const user = getUserFromToken(token);
            if (user) {
                console.log(`Authenticated user ${user.username} with ID ${socket.id}`);
                socket.username = user.username;
            } else {
                console.log('Authentication failed, disconnecting socket');
                socket.disconnect();
            }
        });

        socket.on('join_chat', (room) => {
            socket.join(room);
            console.log(`User joined chat ${room}`);
        });

        socket.on('send_message', async (data) => {
            try {
                const newMessage = new Message(data);
                await newMessage.save();
                io.in(data.room).emit('receive_message', data);
            } catch (err) {
                console.error('Error guardando el mensaje:', err);
            }
        });

        socket.on('request_history', async (room) => {
            try {
                const messages = await Message.find({ room }).sort({ createdAt: 1 });
                socket.emit('history', messages);
            } catch (err) {
                console.error('Error recuperando el historial de mensajes:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected ${socket.id}`);
        });
    });

    return io;
}

module.exports = configureSocket;
