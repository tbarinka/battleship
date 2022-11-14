import { gameBoardLoader } from './boardDOMloader.js';
import { Gameboard } from '../gameAppLogic/gameboard.js';


let playerBoard = new Gameboard();
let aiBoard = new Gameboard();
let player = "taylor"
let ai = "computer"
let boards = new gameBoardLoader(playerBoard, player, aiBoard, ai);
function simplePopulate() {
    boards.simplePopulate();
}

const button = document.createElement('button');
button.addEventListener('click', simplePopulate);
button.classList.add('populateButton');
button.textContent = "Populate";

function generateHUD() {
    boards;
    document.body.appendChild(button);
}


export { button, boards, generateHUD }
