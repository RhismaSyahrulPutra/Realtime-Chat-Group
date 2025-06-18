const users = {};

function addUser(socketId, username, roomId) {
  users[socketId] = { id: socketId, username, roomId };
}

function removeUser(socketId) {
  const user = users[socketId];
  if (user) {
    delete users[socketId];
  }
  return user;
}

function getUser(socketId) {
  return users[socketId] || null;
}

function getUsersInRoom(roomId) {
  return Object.values(users).filter((user) => user.roomId === roomId);
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
