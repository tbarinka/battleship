const Gameboard = require('./gameboard.js');
let board = new Gameboard();

class Ship {
  constructor(name, size, xStart, yStart, direction = 'up') {
    this.name = name
    this.size = size
    this.hits = []
    this.xStart = xStart
    this.yStart = yStart
  }
  hit() {
    this.hits.push('hit');
    if (this.hits.length == this.size) {
      return this.isSunk();
    } else {
      return this.hits;
    }
  }
  isSunk() {
    return 'sunk!'
  }
  calculatePosition() {
    let found = board.grid.find(square => (square.X == this.xStart && square.Y == this.yStart));
    found.containsShip = true;
    found.shipName = this.name;
    return found; 
  }
} module.exports = Ship;
