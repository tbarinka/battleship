import { Gameboard } from '../gameAppLogic/gameboard.js';
import { Ship } from '../gameAppLogic/ship.js'
//1. slice the board array
//2. find the coordinates on which an entire ship has been placed.
//3. remove them from the slice

let aiBoard = new Gameboard();
let aiGrid = copyAIgrid(aiBoard);


copyAIgrid(board) {
    let array = board.grid.slice();
    return array;
}
randomParameterSelector(array, size) {
    let random = array[Math.floor(Math.random() * array.length)];
    let x = random.X;
    let y = random.Y;
    let index = array.indexOf(random);
    let direction = this.randomDirectionProducer();
    array.splice(index, 1);
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
    array.splice(index + 10, 1);
    array.splice(index - 10, 1);
    if (aiBoard.aiBoard.populateShip(size, x, y, direction) == 'overflow!') {
        this.randomParameterSelector(array, size);
    }
    else {
        return {
            X: x,
            Y: y,
            direction: direction,
            size: size,
        };
    }
}
randomDirectionProducer() {
    let num = Math.random();
    if (num >= .75) { return "east" }
    if (num <= .25) {return "west"}
    if (num > .25 && num < .5) { return "south" }
    else { return "north" }
}
function locateOccupiedCoordinates(object) {

    let squaresContainingShips = [];

}


removeOccupiedCoordinates(size, xStart, yStart, direction) {
    let newShip = new Ship(size, xStart, yStart, direction);
    newShip.direction = direction;
    let startingSquare = aiGrid.find(square => (square.X == newShip.xStart && square.Y == newShip.yStart));
    let squaresContainingNewShip = [];
    startingSquare.containsShip = true;
    startingSquare.ship = newShip;
    squaresContainingNewShip.push(startingSquare);
    let yIndex = aiGrid.indexOf(startingSquare);
    while (size > 1) {
        if (direction == "north") {
            yStart = yStart - 1;
            let square = this.grid.find(square => (square.X == newShip.xStart && square.Y == yStart));
            square.containsShip = true;
            square.ship = newShip;
            squaresContainingNewShip.push(square)
            size = size - 1;
        }
        if (direction == "south") {
                //yStart = yStart + 1;
            yIndex += 1
                //let square = this.grid.find(square => (square.X == newShip.xStart && square.Y == yStart));
            let square = this.grid[yIndex];
            square.containsShip = true;
            square.ship = newShip;
            squaresContainingNewShip.push(square)
            size = size - 1;
        } else if (direction == "east") {
            xStart = this.xAxis[this.xAxis.indexOf(xStart) + 1];
            let square = this.grid.find(square => (square.X == xStart && square.Y == newShip.yStart))
            square.containsShip = true;
            square.ship = newShip;
            squaresContainingNewShip.push(square);
            size = size - 1;
        } else if (direction == "west") {
            xStart = this.xAxis[this.xAxis.indexOf(xStart) - 1];
            let square = this.grid.find(square => (square.X == xStart && square.Y == newShip.yStart))
            square.containsShip = true;
            square.ship = newShip;
            squaresContainingNewShip.push(square)
            size = size - 1;
        }
    }
    return squaresContainingNewShip;
}



simplePopulateAI() {
    let array = this.copyAIgrid();
    this.randomParameterSelector(array, 2);
    console.log(array);
    this.randomParameterSelector(array, 2);
    console.log(array);
    this.randomParameterSelector(array, 3);
    console.log(array);
    this.randomParameterSelector(array, 3);
    console.log(array);
    this.randomParameterSelector(array, 4);
    console.log(array);
    let container = document.getElementById('container');
    container.removeChild(container.firstChild.nextSibling);
    twoBoardDOMLoader(this.playerBoard, this.aiBoard);
}