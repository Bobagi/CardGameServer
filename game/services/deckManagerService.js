const path = require("path");

class DeckManagerService {
  constructor() {
    this.deck = [];
  }

  createDeck() {
    this.deck = [
      {
        number: 1,
        strength: 10,
        magic: 5,
        fire: 3,
        art: path.join(__dirname, "../images/1.png"),
        name: "Master Dragon",
      },
      {
        number: 2,
        strength: 6,
        magic: 8,
        fire: 2,
        art: path.join(__dirname, "../images/2.png"),
        name: "Golden Dragon",
      },
      {
        number: 3,
        strength: 10,
        magic: 5,
        fire: 3,
        art: path.join(__dirname, "../images/3.png"),
        name: "Silver Dragon",
      },
      {
        number: 4,
        strength: 6,
        magic: 8,
        fire: 2,
        art: path.join(__dirname, "../images/4.png"),
        name: "Copper Dragon",
      },
      // Add more cards as needed...
    ];
    return this.deck;
  }

  shuffleDeck(deck) {
    return deck.sort(() => Math.random() - 0.5);
  }
}

module.exports = new DeckManagerService();
