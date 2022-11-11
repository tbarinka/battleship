import { Gameboard } from '../gameboard.js';
import { Player } from './player.js';

class AI {
    constructor(opponent) {
        this.board = new Gameboard();
        this.opponent = opponent;
    }
    makeMove(opponent, x, y) {
        opponent.board.receiveAttack(x, y);
        let hitSquare = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return hitSquare;
    }
}

export { AI }