import { gameBoardLoader } from './boardDOMloader.js';
import { Gameboard } from '../gameAppLogic/gameboard.js';

let playerBoard = new Gameboard();
let aiBoard = new Gameboard();
let player = "taylor"
let ai = "computer"
let boards = new gameBoardLoader(playerBoard, player, aiBoard, ai);
const playerPopulateButton = document.createElement('button');
playerPopulateButton.addEventListener('click', simplePopulate);
playerPopulateButton.classList.add('populateButton');
playerPopulateButton.textContent = "Populate Player";
const aiPopulateButton = document.createElement('button');
aiPopulateButton.addEventListener('click', simplePopulateAI);
aiPopulateButton.classList.add('populateButton');
aiPopulateButton.textContent = "Populate AI";
const attackAIButton = document.createElement('button');
attackAIButton.addEventListener('click', attackAI);
attackAIButton.classList.add('populateButton');
attackAIButton.textContent = "Attack AI";
const attackPlayerButton = document.createElement('button');
attackPlayerButton.addEventListener('click', attackPlayer);
attackPlayerButton.classList.add('populateButton');
attackPlayerButton.textContent = "Attack Player"

function generateHUD() {
    boards;
    document.body.appendChild(generateButtons());
    document.body.appendChild(generateForm());
}
function generateButtons() {
    let container = document.createElement('div');
    container.classList.add('buttonContainer');
    container.appendChild(playerPopulateButton);
    container.appendChild(aiPopulateButton);
    container.appendChild(attackPlayerButton);
    container.appendChild(attackAIButton);
    return container;
}
    function simplePopulate() {
        boards.simplePopulate();
    }
    function simplePopulateAI() {
        boards.simplePopulateAI();
    }
    function attackAI() {
        let x = xInput.value;
        let y = yInput.value;
        boards.attackAI(x, y);
    }
//array = globally available copy of playerBoard grid, for use by AI
//every time the AI attacks player, selects one element at random from the array and then removes it
//so that future invocations cannot attack the same location
const array = boards.playerBoard.grid.slice();
    function attackPlayer() {
        if (array.length == 0) return alert('game over!')
        let random = array[Math.floor(Math.random() * array.length)];
        let x = random.X;
        let y = random.Y;
        console.log(x + y);
        console.log(array);
        let index = array.indexOf(random);
        array.splice(index, 1);
        //let x = boards.randomParameterProducer()[0];
        //let y = boards.randomParameterProducer()[1];
        //let found = boards.aiBoard.grid.find(square => (square.X == x && square.Y == y))
        boards.attackPlayer(x, y);
    }

//scripting forms for inputting coordinates
let xLabel = document.createElement('label');
xLabel.classList.add('attackLabel');
xLabel.textContent = "Input X Coordinate: "
let xInput = document.createElement('input');
xInput.setAttribute("type", "text");
let yLabel = document.createElement('label');
yLabel.classList.add('attackLabel');
yLabel.textContent = "Input Y Coordinate: "
let yInput = document.createElement('input');
yInput.setAttribute("type", "text");

function returnXForm() {
    let container = document.createElement('div');
    container.classList.add('formContainer')
    container.appendChild(xLabel);
    container.appendChild(xInput);
    return container
}
function returnYForm() {
    let container = document.createElement('div');
    container.classList.add('formContainer')
    container.appendChild(yLabel);
    container.appendChild(yInput);
    return container
}
function generateForm() {
    let container = document.createElement('div');
    container.classList.add('formContainer')
    container.appendChild(returnXForm());
    container.appendChild(returnYForm());
    return container
}

export { generateHUD }
