import { placementModuleLoader } from './userInterface/boardDOMloader.js';
import { loadBoards } from './userInterface/controller.js';

function loadAppWindow() {
    let container = document.createElement('div');
    contaner.setAttribute('id', 'battleShipContainer');
    placementModuleLoader();
    loadBoards();
    return container;
}

export { loadAppWindow }