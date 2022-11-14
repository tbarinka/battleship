import { Gameboard, Square } from '../gameAppLogic/gameboard.js';
import { AI } from '../playerControls/ai.js';
import { Player } from '../playerControls/player.js';
import { generateHUD } from './controller.js';


//suite of functions for loading the two DOM boards
function squareLoader(coordinate) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.textContent = coordinate.containsShip;
    square.style.backgroundColor = "red";
    if (square.textContent == "true") {
        square.style.backgroundColor = "red";
    }
    return square
}
function boardLoader(board) {
    let arrayOfGridCoordinates = board.grid;
    let container = document.createElement('div');
    container.classList.add('grid-container');
    arrayOfGridCoordinates.forEach((coordinate) => {
        let square = squareLoader(coordinate);
        container.appendChild(square);
    })
    //document.body.appendChild(container);
    return container;
};
function xCoordinateLoader() {
    let arrayOfXCoordinates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let container = document.createElement('div');
    container.classList.add('xCoordinateContainer');
    arrayOfXCoordinates.forEach((coordinate) => {
        let square = document.createElement('div');
        square.classList.add('upperSquare');
        square.textContent = coordinate;
        container.appendChild(square);
    });
    return container;
}
function xCoordinateDoubler() {
    let container = document.createElement('div');
    container.classList.add('xCoordinateContainerDouble');
    container.appendChild(xCoordinateLoader());
    container.appendChild(xCoordinateLoader());
    return container;
}
function yCoordinateLoader() {
    let arrayOfXCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let container = document.createElement('div');
    container.classList.add('yCoordinateContainer');
    arrayOfXCoordinates.forEach((coordinate) => {
        let square = document.createElement('div');
        square.classList.add('leftSquare');
        square.textContent = coordinate;
        container.appendChild(square);
    });
    return container;
}
function yCoordinateDoubler() {
     let container = document.createElement('div');
    container.classList.add('yCoordinateContainerDouble');
    container.appendChild(yCoordinateLoader());
    container.appendChild(yCoordinateLoader());
    return container;
}

function singleCoordinatedBoardLoader(board) {
    let container = document.createElement('div');
    container.classList.add('singleBoardContainer')
    let subcontainer = document.createElement('div');
    subcontainer.classList.add('subcontainer');
        subcontainer.appendChild(yCoordinateLoader());
        subcontainer.appendChild(boardLoader(board));
        container.appendChild(xCoordinateLoader());
        container.appendChild(subcontainer);
    return container;
}
function twoBoardContentGenerator(playerBoard, opponentBoard) {
    let container = document.createElement('div');
    container.classList.add('doubleBoardContainer');
    container.appendChild(singleCoordinatedBoardLoader(playerBoard));
    container.appendChild(singleCoordinatedBoardLoader(opponentBoard));
    return container;
}
function twoBoardDOMLoader(playerBoard, opponentBoard) {
    let container = document.getElementById('container');
    container.appendChild(twoBoardContentGenerator(playerBoard, opponentBoard));
    //document.body.appendChild(twoBoardContentGenerator(playerBoard, opponentBoard));
}
class gameBoardLoader {
    constructor(playerBoard, player, aiBoard, ai) {
        this.playerBoard = playerBoard;
        this.player = player;
        this.aiBoard = aiBoard;
        this.ai = ai
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
    populatePlayer(size, xStart, yStart, direction) {
        this.playerBoard.populateShip(size, xStart, yStart, direction);
    }
    simplePopulate() {
        this.playerBoard.populateShip(1, 'A', 1);
        let container = document.getElementById('container');
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
}

//suite of functions for loading controller info



export { gameBoardLoader }