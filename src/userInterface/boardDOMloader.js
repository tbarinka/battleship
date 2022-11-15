import { Gameboard, Square } from '../gameAppLogic/gameboard.js';
import { AI } from '../playerControls/ai.js';
import { Player } from '../playerControls/player.js';
import { generateHUD } from './controller.js';


//suite of functions for loading the two DOM boards
function squareLoader(coordinate) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.textContent = coordinate.containsShip;
    if (square.textContent == "true") {
        square.style.backgroundColor = "red";
    }
    if (coordinate.isHit == true) {
        square.textContent = "X";
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
    container.prepend(twoBoardContentGenerator(playerBoard, opponentBoard)); 
}
function ScoreKeeperGenerator(player, input) {
    let container = document.createElement('div');
    container.classList.add('singleBoardScoreContainer')
    let label = document.createElement('div');
    let score = document.createElement('div');
    label.textContent = player + " score: "
    container.appendChild(label);
    container.appendChild(score);
    score.textContent = input;
    return container
}
function doubleScoreKeeperGenerator(player1, input1, player2, input2) {
    let scoreContainer = document.createElement('div');
    scoreContainer.classList.add('scoreKeeperContainer');
    scoreContainer.appendChild(ScoreKeeperGenerator(player1, input1));
    scoreContainer.appendChild(ScoreKeeperGenerator(player2, input2));
    let container = document.getElementById('container');
    container.appendChild(scoreContainer)
}
function removeDuplicates(array) {
    return array.filter((item,
        index) => arr.indexOf(item) === index);
}
class gameBoardLoader {
    constructor(playerBoard, player, aiBoard, ai) {
        this.playerBoard = playerBoard;
        this.player = player;
        this.aiBoard = aiBoard;
        this.ai = ai
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
        doubleScoreKeeperGenerator("Player", "", "AI", "");
    }
    populatePlayer(size, xStart, yStart, direction) {
        //this.playerBoard.populateShip(size, xStart, yStart, direction);
    }
    simplePopulate() {
        this.playerBoard.populateShip(1, 'J', 1, "west");
        this.playerBoard.populateShip(1, 'A', 3);
        this.playerBoard.populateShip(2, 'C', 3, "east");
        this.playerBoard.populateShip(1, 'G', 3);
        this.playerBoard.populateShip(2, 'I', 4, "east");
        this.playerBoard.populateShip(1, 'A', 5);
        this.playerBoard.populateShip(4, 'C', 5, "east");
        this.playerBoard.populateShip(3, 'J', 6, "south");
        this.playerBoard.populateShip(3, 'B', 8, "south");
        this.playerBoard.populateShip(2, 'E', 9, "east");
        let container = document.getElementById('container');
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
    simplePopulateAI() {
        this.aiBoard.populateShip(1, 'J', 1, "west");
        this.aiBoard.populateShip(1, 'A', 3);
        this.aiBoard.populateShip(2, 'C', 3, "east");
        this.aiBoard.populateShip(1, 'G', 3);
        this.aiBoard.populateShip(2, 'I', 4, "east");
        this.aiBoard.populateShip(1, 'A', 5);
        this.aiBoard.populateShip(4, 'C', 5, "east");
        this.aiBoard.populateShip(3, 'J', 6, "south");
        this.aiBoard.populateShip(3, 'B', 8, "south");
        this.aiBoard.populateShip(2, 'E', 9, "east");
        let container = document.getElementById('container');
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
    attackAI(x, y) {
        this.aiBoard.receiveAttack(x, y);
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
        this.keepScore()
    }
    attackPlayer(x, y) {
        this.playerBoard.receiveAttack(x, y);
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
        this.keepScore()
    }
    produceArrayOfPlayerShips() {
        let playerShips = []
        this.playerBoard.grid.forEach((square) => {
            if (square.ship != null) {
                playerShips.push(square.ship);
            }
        })
        //playerShips contains duplicates of each ship, so I filter the array below
        let playerShipsFiltered = [];
        playerShips.forEach(ship => {
            if (!playerShipsFiltered.includes(ship)) {
                playerShipsFiltered.push(ship);
            }
        })
        return playerShipsFiltered;
    }
    produceArrayOfAiShips() {
        let aiShips = []
        this.aiBoard.grid.forEach((square) => {
            if (square.ship != null) {
                aiShips.push(square.ship);
            }
        })
        //playerShips contains duplicates of each ship, so I filter the array below
        let aiShipsFiltered = [];
        aiShips.forEach(ship => {
            if (!aiShipsFiltered.includes(ship)) {
                aiShipsFiltered.push(ship);
            }
        })
        return aiShipsFiltered;
    }
    keepScore() {
        let playerShips = this.produceArrayOfPlayerShips();
        let aiShips = this.produceArrayOfAiShips();
        let playerTally = 0
        let aiTally = 0
        playerShips.forEach((ship) => {
            if (ship.hits.length == ship.size) {
                playerTally += 1
            }
        })
        aiShips.forEach((ship) => {
            if (ship.hits.length == ship.size) {
                aiTally += 1;
            }
        });
        container.removeChild(container.firstChild.nextSibling);
        console.log(playerTally)
        console.log(aiTally);
        doubleScoreKeeperGenerator("Player", playerTally, "AI", aiTally);
        //construct a list of gameboard.grid ships
        //for any ship, if ship.hits == size, add +1 to score
        //input score in doubleScoreKeeperGenerator
    }
}

//suite of functions for loading controller info



export { gameBoardLoader }