const { getMessages } = require('../utils/messages');

function getChatHistory(req, res) {
  const roomId = req.params.roomId;
  const messages = getMessages(roomId);
  res.json({ messages });
}

module.exports = { getChatHistory };
