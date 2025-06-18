const { Server } = require('socket.io');
const registerChatHandlers = require('./events/chat');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    registerChatHandlers(io, socket);
  });
}

module.exports = { setupSocket };
