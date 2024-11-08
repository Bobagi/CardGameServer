require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  socket.on("test_message", (msg) => {
    console.log(`Message from client ${socket.id}: ${msg}`);
    socket.emit("message", "Hello from the server!");
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
