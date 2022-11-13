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
function singleBoardLoaderDOM(board) {
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
function twoBoardLoader(playerBoard, opponentBoard) {
    let container = document.createElement('div');
    container.classList.add('boards-container')
    container.appendChild(singleBoardLoaderDOM(playerBoard));
    container.appendChild(singleBoardLoaderDOM(opponentBoard));
    document.body.appendChild(container)
}
class gameBoardLoader {
    constructor(board, player, opponent) {
        this.playerBoard = new Gameboard();
        this.player = player;
        this.opponentBoard = new Gameboard();
        this.opponent = opponent
        twoBoardLoader(this.playerBoard, this.opponentBoard);
    }
}


export { gameBoardLoader }