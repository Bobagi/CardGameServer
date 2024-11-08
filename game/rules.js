class Rules {
  static compareCards(playerCard, opponentCard, attribute) {
    const playerValue = playerCard[attribute.type];
    const opponentValue = opponentCard[attribute.type];

    if (playerValue > opponentValue) return "Player";
    if (opponentValue > playerValue) return "Opponent";
    return "Draw";
  }

  static handleRoundOutcome(
    winner,
    playerCard,
    opponentCard,
    playerDeck,
    opponentDeck
  ) {
    if (winner === "Player") playerDeck.push(opponentCard);
    else if (winner === "Opponent") opponentDeck.push(playerCard);
  }

  static checkGameOver(playerDeck, opponentDeck) {
    if (playerDeck.length === 0) return "Opponent";
    if (opponentDeck.length === 0) return "Player";
    return null;
  }
}

module.exports = Rules;
