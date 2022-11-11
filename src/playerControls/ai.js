import { Gameboard } from '../gameboard.js';
import { Player } from './player.js';

class AI {
    constructor(opponent) {
        this.board = new Gameboard();
        this.opponent = opponent;
    }
}

export { AI }