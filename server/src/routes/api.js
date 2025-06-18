const express = require('express');
const { getChatHistory } = require('../controllers/chatController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from API' });
});

router.get('/chats', getChatHistory);

module.exports = router;
