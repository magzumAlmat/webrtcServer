const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Настройка CORS для разрешения запросов с любого источника
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));



const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Настройте на конкретный URL для безопасности
    methods: ['GET', 'POST'],
  },
});







io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Обработка сигналов от клиента
  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
