const io = require("socket.io-client");
const readline = require("readline");
const logger = require("./logger");
// Conecta ao servidor
const socket = io("http://localhost:3000");

// Interface para entrada de comandos no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Exibe instruções no terminal
function showInstructions() {
  logger.info("\nComandos disponíveis:");
  logger.info("startTurn                - Iniciar um novo turno");
  logger.info("selectCard [index]       - Selecionar uma carta pelo índice");
  logger.info("exit                     - Sair do jogo\n");
}

// Conecta e lida com eventos
socket.on("connect", () => {
  logger.info("Conectado ao servidor como cliente:", socket.id);
  showInstructions();
  promptUser();
});

// Função para processar comandos do usuário
function processCommand(command) {
  const [action, param] = command.trim().split(" ");

  switch (action) {
    case "startTurn":
      logger.info("Iniciando um novo turno...");
      socket.emit("startTurn");
      break;

    case "selectCard":
      const cardIndex = parseInt(param);
      if (isNaN(cardIndex)) {
        logger.info(
          "Erro: você deve fornecer um índice válido para selectCard."
        );
      } else {
        logger.info(`Selecionando a carta com índice ${cardIndex}...`);
        socket.emit("selectCard", { index: cardIndex });
      }
      break;

    case "exit":
      logger.info("Saindo do jogo...");
      rl.close();
      socket.disconnect();
      process.exit(0);
      break;

    default:
      logger.info("Comando não reconhecido. Tente novamente.");
      showInstructions();
  }
}

// Prompt para entrada do usuário
function promptUser() {
  rl.question("Digite um comando: ", (command) => {
    processCommand(command);
    promptUser();
  });
}

// Recebe atualizações do estado do jogo
socket.on("update", (data) => {
  logger.info("Atualização do estado do jogo:", data.state);
});

// Recebe mensagem de fim de jogo
socket.on("gameOver", (data) => {
  logger.info("Fim de jogo:", data.message);
  rl.close();
  socket.disconnect();
  process.exit(0);
});

// Lida com o evento de desconexão
socket.on("disconnect", () => {
  logger.info("Desconectado do servidor");
  rl.close();
  process.exit(0);
});
