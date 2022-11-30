import './style.css';
import { placementModuleLoader, announceWinnerCard } from './userInterface/boardDOMloader.js'
import { generateHUD } from './userInterface/controller.js'


generateHUD();
//placementModuleLoader();
announceWinnerCard('You win!');