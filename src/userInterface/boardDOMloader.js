import { Gameboard, Square } from '../gameAppLogic/gameboard.js';
import { AI } from '../playerControls/ai.js';
import { Player } from '../playerControls/player.js';
import { generateHUD, attackAI } from './controller.js';


//suite of functions for loading the two DOM boards & score keeper card
function squareLoader(coordinate, player = "ai") {
    let square = document.createElement('div');
    square.classList.add('square');
    if (coordinate.isHit == true) {
        square.style.backgroundColor = "#6ee7b7";
    }
    if (player == "ai") {
        square.addEventListener('click', function () {
            let x = coordinate.X;
            let y = coordinate.Y;
            attackAI(x, y);
            console.log(x + y)
        });
    }
    if (coordinate.isHit == true && coordinate.containsShip == true) {
        square.style.backgroundColor = "red";
        square.textContent = "X";
    }
    if (coordinate.containsShip == true) {
        square.style.backgroundColor = "red";
    }
    return square;
}
function boardLoader(board, player) {
    let arrayOfGridCoordinates = board.grid;
    let container = document.createElement('div');
    container.classList.add('grid-container');
    arrayOfGridCoordinates.forEach((coordinate) => {
        let square = squareLoader(coordinate, player);
        container.appendChild(square);
    })
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
function playerCoordinatedBoardLoader(board) {
    let container = document.createElement('div');
    container.classList.add('singleBoardContainer')
    let subcontainer = document.createElement('div');
    subcontainer.classList.add('subcontainer');
        subcontainer.appendChild(yCoordinateLoader());
        subcontainer.appendChild(boardLoader(board, "player"));
        container.appendChild(xCoordinateLoader());
        container.appendChild(subcontainer);
    return container;
}
function aiCoordinatedBoardLoader(board) {
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
    container.appendChild(playerCoordinatedBoardLoader(playerBoard));
    container.appendChild(aiCoordinatedBoardLoader(opponentBoard));
    return container;
}
function twoBoardDOMLoader(playerBoard, opponentBoard) {
    let container = document.getElementById('container');
    container.prepend(twoBoardContentGenerator(playerBoard, opponentBoard)); 
}
function scoreKeeperGenerator(player, input) {
    let container = document.createElement('div');
    container.classList.add('singleBoardScoreContainer')
    let label = document.createElement('div');
    let score = document.createElement('div');
    label.textContent = player + " score: "
    container.appendChild(label);
    container.appendChild(score);
    score.textContent = input + "/5";
    return container
}
function doubleScoreKeeperGenerator(player1, input1, player2, input2) {
    let scoreContainer = document.createElement('div');
    scoreContainer.classList.add('scoreKeeperContainer');
    scoreContainer.appendChild(scoreKeeperGenerator(player1, input1));
    scoreContainer.appendChild(scoreKeeperGenerator(player2, input2));
    let container = document.getElementById('container');
    container.appendChild(scoreContainer)
}
function removeDuplicates(array) {
    return array.filter((item,
        index) => arr.indexOf(item) === index);
}
function announceWinner(text) {
    let card = document.createElement('div');
    card.classList.add('winnerCard');
    card.textContent = text;
    container.firstChild.appendChild(card);
}
class gameBoardLoader {
    constructor(playerBoard, player, aiBoard, ai) {
        this.playerBoard = playerBoard;
        this.player = player;
        this.aiBoard = aiBoard;
        this.ai = ai
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
        doubleScoreKeeperGenerator("Player", 0, "AI", 0);
    }
    populatePlayer(size, xStart, yStart, direction) {
        //this.playerBoard.populateShip(size, xStart, yStart, direction);
    }
    simplePopulate() {
        this.playerBoard.populateShip(2, 'I', 4, "east");
        this.playerBoard.populateShip(4, 'C', 5, "east");
        this.playerBoard.populateShip(3, 'J', 6, "south");
        this.playerBoard.populateShip(3, 'B', 8, "south");
        this.playerBoard.populateShip(2, 'E', 9, "east");
        let container = document.getElementById('container');
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
    simplePopulateAI() {
        this.aiBoard.populateShip(2, 'I', 4, "east");
        this.aiBoard.populateShip(4, 'C', 5, "east");
        this.aiBoard.populateShip(3, 'J', 6, "south");
        this.aiBoard.populateShip(3, 'B', 8, "south");
        this.aiBoard.populateShip(2, 'E', 9, "east");
        let container = document.getElementById('container');
        container.removeChild(container.firstChild);
        twoBoardDOMLoader(this.playerBoard, this.aiBoard);
    }
    attackAI(x, y) {
        if (this.aiBoard.X == x || this.aiBoard.Y == y) {
            return console.log('repeat hit');
        }
        else {
            this.aiBoard.receiveAttack(x, y);
            container.removeChild(container.firstChild);
            twoBoardDOMLoader(this.playerBoard, this.aiBoard);
            this.keepScore()
        }
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
        doubleScoreKeeperGenerator("AI", playerTally, "Player", aiTally);
        if (playerTally == 5) {
            announceWinner("AI wins!");
        } else if (aiTally == 5) {
            announceWinner("You win!");
        }
        //construct a list of gameboard.grid ships
        //for any ship, if ship.hits == size, add +1 to score
        //input score in doubleScoreKeeperGenerator
    }
    randomParameterProducer() {
        let x = this.playerBoard.xAxis[Math.trunc(Math.random() * 10)];
        let y = this.playerBoard.yAxis[Math.trunc(Math.random() * 10)];
        //let square = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return [x, y];
}
}


//suite for loading carrier placement module before game begins
let placementContainer = document.createElement('div');
placementContainer.classList.add('placement-module-container');
function placementModuleLoader() {
    placementContainer.appendChild(infoTextLoader());
    placementContainer.appendChild(placementBoardLoader());
    return placementContainer;
}
function infoTextLoader() {
    let place = document.createElement('div');
    place.classList.add('placementText');
    place.textContent = "Place Your Ships";
    return place
}
function placementBoardLoader() {
    let board = new Gameboard();
    return selectShipPlayerCoordinatedBoardLoader(board);
}
function selectShipSquareLoader(coordinate) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', function (event) {
        if (event.type == 'mouseover') {
            square.style.backgroundColor = "red";
        } else if (event.type == "click") {
            console.log('click');
        }
    });
    return square;
}
function selectShipBoardLoader(board) {
    let arrayOfGridCoordinates = board.grid;
    let container = document.createElement('div');
    container.classList.add('grid-container');
    arrayOfGridCoordinates.forEach((coordinate) => {
        let square = selectShipSquareLoader(coordinate);
        container.appendChild(square);
    })
    return container;
};
function selectShipPlayerCoordinatedBoardLoader(board) {
    let container = document.createElement('div');
    container.classList.add('singleBoardContainer')
    let subcontainer = document.createElement('div');
    subcontainer.classList.add('subcontainer');
        subcontainer.appendChild(yCoordinateLoader());
        subcontainer.appendChild(selectShipBoardLoader(board));
        container.appendChild(xCoordinateLoader());
        container.appendChild(subcontainer);
    return container;
}

//create a function that places a two-square ship
    //when mouseover square S, square turns red along with the southward square
    //then add rotate functionality

export { gameBoardLoader, placementModuleLoader }