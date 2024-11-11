const DeckManagerService = require("./services/deckManagerService");
const Rules = require("./rules");
const logger = require("../logger");
class Game {
  constructor() {
    logger.info("Inicializando o jogo...");
    this.deckService = DeckManagerService;
    this.playerDeck = this.deckService.shuffleDeck(
      this.deckService.createDeck()
    );
    this.opponentDeck = this.deckService.shuffleDeck(
      this.deckService.createDeck()
    );
    this.playerHand = [];
    this.opponentHand = [];
    logger.info("Jogo inicializado. Baralhos embaralhados e prontos.");
  }

  startTurn() {
    logger.info("Iniciando um novo turno...");

    if (this.playerDeck.length > 0) {
      this.dealCards(this.playerDeck, this.playerHand, 1);
      logger.info(`Carta distribuída ao jogador:`, this.playerHand);
    } else {
      logger.info("O baralho do jogador está vazio.");
      return this.checkGameOver();
    }

    if (this.opponentDeck.length > 0) {
      this.dealCards(this.opponentDeck, this.opponentHand, 1);
      logger.info(`Carta distribuída ao oponente:`, this.opponentHand);
    } else {
      logger.info("O baralho do oponente está vazio.");
      return this.checkGameOver();
    }

    logger.info(
      "Estado atual do jogo após a distribuição de cartas:",
      this.getGameState()
    );
    return this.getGameState();
  }

  getGameState() {
    return {
      playerDeck: this.playerDeck,
      opponentDeck: this.opponentDeck,
      playerHand: this.playerHand,
      opponentHand: this.opponentHand,
    };
  }

  checkGameOver() {
    const result = Rules.checkGameOver(this.playerDeck, this.opponentDeck);
    if (result) {
      const message = result === "Player" ? "Você venceu!" : "Você perdeu!";
      logger.info("Fim de jogo:", message);
      return {
        gameOver: true,
        message: message,
      };
    }
    return { gameOver: false };
  }

  dealCards(deck, hand, numberOfCardsToDraw) {
    const drawnCards = deck.splice(0, numberOfCardsToDraw);
    hand.splice(0, hand.length, ...drawnCards);
    logger.info(`Cartas distribuídas:`, drawnCards);
  }

  selectCard(cardIndex, attribute) {
    if (cardIndex < 0 || cardIndex >= this.playerHand.length) {
      logger.info("Índice de carta inválido:", cardIndex);
      return this.getGameState();
    }

    const selectedCard = this.playerHand[cardIndex];
    logger.info(`Carta selecionada pelo jogador:`, selectedCard);

    const opponentCard = this.opponentHand[0]; // A máquina joga a primeira carta
    logger.info(`Carta jogada pelo oponente:`, opponentCard);

    // Usa o atributo escolhido pelo jogador para comparar as cartas
    const winner = Rules.compareCards(selectedCard, opponentCard, {
      type: attribute,
    });
    logger.info("Resultado da rodada:", winner);

    Rules.handleRoundOutcome(
      winner,
      selectedCard,
      opponentCard,
      this.playerDeck,
      this.opponentDeck
    );
    logger.info("Estado do jogo após a rodada:", this.getGameState());

    return this.getGameState();
  }
}

module.exports = Game;
