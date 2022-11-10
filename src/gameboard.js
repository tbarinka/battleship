import { Ship } from './ship.js';

class Square {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
        this.isHit = false;
        this.containsShip = false;
        this.ship = null;
    }
}

class Gameboard {
    constructor(input) {
        this.xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H,', 'I', 'J']
        this.yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.grid = this.makeGrid()
    }
    receiveAttack(xLetter, yNum) {
        let found = this.grid.find(square => (square.X == xLetter && square.Y == yNum));
        found.isHit = true;
        if (this.ship) {
            this.ship.hit();
        }
        return found;
    }
    makeGrid() {
        let grid = [];
        for (let x = 0; x < this.xAxis.length; x++) {
            for (let y = 0; y < this.yAxis.length; y++) {
                let square = new Square(this.xAxis[x], this.yAxis[y]);
                grid.push(square);
            }
        }
        return grid;
    }
    populateShip(name, size, xStart, yStart) {
        let newShip = new Ship(name, size, xStart, yStart);
        let startingSquare = this.grid.find(square => (square.X == newShip.xStart && square.Y == newShip.yStart));
        startingSquare.containsShip = true;
        startingSquare.ship = newShip;
        //add some code to account for size > 1 and direction
        return startingSquare.ship;
    }
}

export { Gameboard }