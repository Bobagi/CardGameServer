require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Game = require("./game/game"); // Load the Game class

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const gameInstance = new Game(); // Initialize a new game instance

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.emit("connected", {
    action: "connected",
    message: "Connection established",
  });

  // Start the game turn for the connected client
  socket.on("startTurn", () => {
    const gameState = gameInstance.startTurn();
    socket.emit("update", { action: "update", state: gameState });
  });

  // Handle card selection
  socket.on("selectCard", (data) => {
    const { index } = data;
    const gameState = gameInstance.selectCard(index);
    socket.emit("update", { action: "update", state: gameState });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
