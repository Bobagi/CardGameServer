
# CardGameServer

CardGameServer is a Node.js-based server for a card game, using Socket.IO to handle real-time game interactions between clients. This server is responsible for managing game states, handling turns, and implementing core game logic.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

---

## Requirements

- **Node.js** (v14 or higher)
- **Docker** (optional, for containerized deployment)
- **npm** (Node package manager)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/CardGameServer.git
   cd CardGameServer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:

   In the project root, create a `.env` file with the following variables:

   ```plaintext
   SERVER_URI=http://localhost
   PORT=3000
   ```

   Adjust `PORT` and `SERVER_URI` if you want the server to listen on a different port or URI.

4. **Build and Run with Docker (optional)**:

   If you prefer to run the server in a Docker container:

   - **Build the Docker image**:

     ```bash
     docker-compose build
     ```

   - **Run the Docker container**:

     ```bash
     docker-compose up
     ```

   The server will run inside a Docker container and expose the specified port.

## Usage

1. **Start the Server (without Docker)**:

   ```bash
   npm start
   ```

2. **Start the Server (with Docker)**:

   If using Docker, the server will automatically start with the `docker-compose up` command.

3. **Accessing the Server**:

   The server will run on `http://localhost:3000` (or the port specified in `.env`). 

4. **Testing**:

   - Use a WebSocket client like Postman or a browser client to connect to `ws://localhost:3000` and interact with the server.
   - The server will listen for game-related commands such as `startTurn` and `selectCard`.

## Project Structure

```
CardGameServer/
├── game/                     # Game-related logic files
│   ├── game.js               # Core game logic and game state management
│   ├── rules.js              # Game rules (card comparison, round outcome, game-over check)
│   ├── services/             # Game service classes
│   │   └── deckManagerService.js  # Manages deck creation and shuffling
├── models/                   # Data models
│   ├── card.js               # Card model (structure of card objects)
│   └── attributes.js         # Attributes model (card attribute types)
├── server.js                 # Main server file (handles socket connections)
├── .env                      # Environment variables
├── Dockerfile                # Docker configuration for container setup
└── docker-compose.yml        # Docker Compose for easy service management
```

## Environment Variables

Environment variables are configured in a `.env` file at the project root. Here’s a description of each:

- `SERVER_URI`: The URI for the server (e.g., `http://localhost`).
- `PORT`: The port on which the server will listen (default is `3000`).

## License

This project is licensed under the MIT License.
