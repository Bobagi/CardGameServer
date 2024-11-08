const io = require("socket.io-client");

// Connect to the server
const socket = io("http://localhost:3000");

// Parse command-line arguments to specify which actions to test
const args = process.argv.slice(2);
const actions = {
  startTurn: args.includes("startTurn"),
  selectCard: args.includes("selectCard"),
  cardIndex: args.includes("selectCard")
    ? parseInt(args[args.indexOf("selectCard") + 1]) || 0
    : 0,
};

// Connect and handle events
socket.on("connect", () => {
  console.log("Connected to the server as client:", socket.id);

  // Execute specified actions
  if (actions.startTurn) {
    console.log("Testing startTurn...");
    socket.emit("startTurn");
  }

  if (actions.selectCard) {
    console.log(`Testing selectCard with index: ${actions.cardIndex}...`);
    socket.emit("selectCard", { index: actions.cardIndex });
  }
});

// Listen for game state updates
socket.on("update", (data) => {
  console.log("Game state updated:", data.state);
});

// Listen for game over event
socket.on("gameOver", (data) => {
  console.log("Game Over:", data.message);
});

// Handle disconnection event
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
