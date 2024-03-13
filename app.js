require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

// Base de datos

require('./config/db.config');

// Creamos la instancia de la app

const app = express();
const server = http.createServer(app);


app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  }));
app.use(express.json());
app.use(logger('dev'));

// Rutas

const routes = require('./config/routes.config');
app.use('/', routes);

//Socket-io
const configureSocket = require('./config/socket.config');
configureSocket(server);


/* Handle errors */

// Middleware para cuando no encuentra ruta
app.use((req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND, "Route not found"));
});

// Middleware genérico de errores
app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(400, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Resource already exists");
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(401, error);
  } else if (!error.status) {
    error = createError(500);
  }

  const data = {};

  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce((errors, key) => {
      return {
        ...errors,
        [key]: error.errors[key].message || error.errors[key],
      };
    }, {})
    : undefined;

  res.status(error.status).json(data);
});

/*SOCKET IO*/
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // No necesitamos mantener un mapeo de usuarios a sockets para esta lógica
// // pero si necesitas autenticación o manejar usuarios individualmente, puedes mantenerlo

// io.on('connection', (socket) => {
//   console.log('A user connected', socket.id);

//   // Autenticación del usuario y asociación con el socket
//   socket.on('authenticate', (token) => {
//     const user = getUserFromToken(token);
//     if (user) {
//       console.log(`Authenticated user ${user.username} with ID ${socket.id}`);
//       // Asociar el nombre de usuario con este socket para uso futuro si es necesario
//       socket.username = user.username;
//     } else {
//       console.log('Authentication failed, disconnecting socket');
//       socket.disconnect();
//     }
//   });

//   // Unirse a un chat room
//   socket.on('join_chat', (room) => {
//     socket.join(room);
//     console.log(`User ${socket.username} joined chat ${room}`);
//   });

//   // Enviar y recibir mensajes en el room
//   socket.on('send_message', (message) => {
//     // Reenviar el mensaje a todos en el room, incluido el remitente
//     io.in(message.room).emit('receive_message', message);
//     console.log(`Message sent in room ${message.room} by ${message.from}`);
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected ${socket.id}`);
//   });
// });

// function getUserFromToken(token) {
//   // Implementa tu lógica de autenticación aquí
//   if (token === "valid-token") {
//     return { username: "john_doe" };
//   }
//   return null;
// }


// Arranque del servidor

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));