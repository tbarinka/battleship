import { gameBoardLoader } from './boardDOMloader.js';
import { Gameboard } from '../gameAppLogic/gameboard.js';

function generateHUD() {
    boards;
    document.body.appendChild(generateButtons())
}
function generateButtons() {
    let container = document.createElement('div');
    container.appendChild(playerPopulateButton);
    container.appendChild(aiPopulateButton);
    return container;
}

let playerBoard = new Gameboard();
let aiBoard = new Gameboard();
let player = "taylor"
let ai = "computer"
let boards = new gameBoardLoader(playerBoard, player, aiBoard, ai);

function simplePopulate() {
    boards.simplePopulate();
}
function simplePopulateAI() {
    boards.simplePopulateAI();
}

const playerPopulateButton = document.createElement('button');
playerPopulateButton.addEventListener('click', simplePopulate);
playerPopulateButton.classList.add('populateButton');
playerPopulateButton.textContent = "Populate Player";

const aiPopulateButton = document.createElement('button');
aiPopulateButton.addEventListener('click', simplePopulateAI);
aiPopulateButton.classList.add('populateButton');
aiPopulateButton.textContent = "Populate AI"



export { generateHUD }
