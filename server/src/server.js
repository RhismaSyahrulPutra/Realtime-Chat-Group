const express = require('express');
const http = require('http');
const { setupSocket } = require('./socket');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/', apiRoutes);

setupSocket(server);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
