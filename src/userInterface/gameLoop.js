import { Gameboard, Square } from '../gameAppLogic/gameboard.js';
import { AI } from '../playerControls/ai.js';
import { Player } from '../playerControls/player.js';

//let body = document.getElementById('body');

class squareDOM {
    constructor(object) {
        this.coordinate = object;
        this.isHit = false;
    };
    hit() {
        this.isHit = true;
    }

}

function squareLoader(coordinate) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.textContent = coordinate.X + coordinate.Y;
    return square
}

function gridColumnLoader(array) {
    let column = document.createElement('div');
    column.classList.add('grid-container-column');
    return column;
}

function gameBoardLoaderDOM() {
    let gameBoard = new Gameboard();
    let arrayOfGridCoordinates = gameBoard.grid;
    let container = document.createElement('div');
    container.classList.add('grid-container');
    arrayOfGridCoordinates.forEach((coordinate) => {
        let square = squareLoader(coordinate);
        container.appendChild(square);
    })
    document.body.appendChild(container);
};

export { gameBoardLoaderDOM }