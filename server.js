require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Game = require("./game/game"); // Load the Game class
const logger = require("./logger");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Armazena as instâncias de jogo para cada jogador conectado
const activeGames = {};

io.on("connection", (socket) => {
  logger.info("New player connected:", socket.id);

  // Cria uma nova instância do jogo para este jogador
  const gameInstance = new Game();
  activeGames[socket.id] = gameInstance;

  // Envia a confirmação de conexão
  socket.emit("connected", {
    action: "connected",
    message: "Connection established. Game instance created.",
  });

  // Iniciar o turno para este jogador
  socket.on("startTurn", () => {
    const game = activeGames[socket.id];
    if (game) {
      const gameState = game.startTurn();
      socket.emit("update", { action: "update", state: gameState });
    }
  });

  // Jogar a carta selecionada pelo jogador
  socket.on("selectCard", (data) => {
    const { index, attribute } = data; // `attribute` define o atributo escolhido pelo jogador (ex: "strength", "magic", etc.)
    const game = activeGames[socket.id];
    if (game) {
      const gameState = game.selectCard(index, attribute);
      socket.emit("update", { action: "update", state: gameState });
      if (gameState.gameOver) {
        socket.emit("gameOver", { message: gameState.message });
      }
    }
  });

  // Ao desconectar, limpa a instância de jogo
  socket.on("disconnect", () => {
    logger.info("Player disconnected:", socket.id);
    delete activeGames[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
