import './style.css';
import { placementModuleLoader, announceWinnerCard } from './userInterface/boardDOMloader.js'
import { generateHUD, generateHUDwithShipPlacement } from './userInterface/controller.js'


placementModuleLoader();
//announceWinnerCard('You win!');