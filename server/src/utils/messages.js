const messages = {};

function saveMessage(roomId, message) {
  if (!messages[roomId]) messages[roomId] = [];
  messages[roomId].push(message);
}

function getMessages(roomId) {
  return messages[roomId] || [];
}

module.exports = { saveMessage, getMessages };
