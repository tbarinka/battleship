class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
    this.hits = []
    //this.position = 
  }
  hit() {
    this.hits.push('hit');
    if (this.hits.length == this.length) {
      return this.isSunk();
    } else {
      return this.hits;
    }
  }
  isSunk() {
    return 'sunk!'
  }
}
class Gameboard {
  constructor() {
    this.length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.width = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  receiveAttack() {
    return "test"
  }
}
module.exports = Ship;
//module.exports = Gameboard;