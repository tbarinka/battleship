import './style.css';
import { placementModuleLoader, announceWinnerCard } from './userInterface/boardDOMloader.js'
import { loadBoards, generateHUD, generateHUDwithShipPlacement } from './userInterface/controller.js'


placementModuleLoader();
loadBoards();
