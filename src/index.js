import './style.css';
import { gameBoardLoader, placementModuleLoader } from './userInterface/boardDOMloader.js'
import { button, boards, generateBoards, generateHUD } from './userInterface/controller.js'


//new gameBoardLoader();
generateHUD();
document.body.appendChild(placementModuleLoader());