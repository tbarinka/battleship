class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
    this.hits = []
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

module.exports = Ship;
