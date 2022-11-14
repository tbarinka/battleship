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
const refreshButton = document.createElement('button');
refreshButton.addEventListener('click', refresh);
refreshButton.classList.add('populateButton');
refreshButton.textContent = "Refresh [code not rdy"

function generateHUD() {
    boards;
    document.body.appendChild(generateButtons())
}
function generateButtons() {
    let container = document.createElement('div');
    container.classList.add('buttonContainer');
    container.appendChild(playerPopulateButton);
    container.appendChild(aiPopulateButton);
    container.appendChild(refreshButton);
    return container;
}

function simplePopulate() {
    boards.simplePopulate();
}
function simplePopulateAI() {
    boards.simplePopulateAI();
}
function refresh() {

}


export { generateHUD }
