const { saveMessage } = require('../../utils/messages');
const { addUser, removeUser, getUsersInRoom } = require('../../utils/users');

function registerChatHandlers(io, socket) {
  socket.on('joinRoom', ({ roomId, username }) => {
    socket.data.username = username;
    socket.data.roomId = roomId;
    socket.data.hasLeft = false;

    socket.join(roomId);
    addUser(socket.id, username, roomId);

    const usersInRoom = getUsersInRoom(roomId).map((u) => u.username);
    socket.emit('joinedRoom');
    io.to(roomId).emit('usersInRoom', usersInRoom);
    socket.to(roomId).emit('userJoined', `${username} joined the chat`);
    socket.to(roomId).emit('userOnline', username);
  });

  socket.on('sendMessage', ({ roomId, message, timestamp }) => {
    const sender = socket.data.username;
    const newMessage = { msg: message, timestamp, sender };
    saveMessage(roomId, newMessage);
    io.to(roomId).emit('newMessage', newMessage);
  });

  socket.on('typing', ({ roomId, isTyping }) => {
    const username = socket.data.username;
    socket.to(roomId).emit('typing', { username, isTyping });
  });

  socket.on('stopTyping', ({ roomId }) => {
    const username = socket.data.username;
    socket.to(roomId).emit('stopTyping', { username });
  });

  socket.on('manualLeave', ({ roomId }) => {
    const user = getUsersInRoom(roomId).find((u) => u.id === socket.id);
    if (!user) return;

    socket.data.hasLeft = true;

    removeUser(socket.id);
    socket.leave(roomId);

    socket.to(roomId).emit('userLeft', `${user.username} left the chat`);
    socket.to(roomId).emit('userOffline', user.username);

    const usersInRoom = getUsersInRoom(roomId).map((u) => u.username);
    io.to(roomId).emit('usersInRoom', usersInRoom);
  });

  socket.on('disconnect', () => {
    if (socket.data.hasLeft) return;

    const user = removeUser(socket.id);
    if (user) {
      socket.to(user.roomId).emit('userLeft', `${user.username} left the chat`);
      socket.to(user.roomId).emit('userOffline', user.username);

      const usersInRoom = getUsersInRoom(user.roomId).map((u) => u.username);
      io.to(user.roomId).emit('usersInRoom', usersInRoom);
    }
  });
}

module.exports = registerChatHandlers;
