const io = require("socket.io-client");

// Connect to the server
const socket = io("http://localhost:3000");

// Handle connection event
socket.on("connect", () => {
  console.log("Connected to the server as client:", socket.id);

  // Send a test message
  socket.emit("test_message", "Hello from the client!");
});

// Listen for any messages from the server
socket.on("message", (msg) => {
  console.log("Received message from server:", msg);
});

// Handle disconnection event
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
