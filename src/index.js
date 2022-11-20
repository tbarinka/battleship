import './style.css';
import { gameBoardLoader, placementModuleLoader } from './userInterface/boardDOMloader.js'
import { button, boards, generateBoards, generateHUD, generateHUDwithShipPlacement } from './userInterface/controller.js'


generateHUD();
placementModuleLoader();
//generateHUDwithShipPlacement();