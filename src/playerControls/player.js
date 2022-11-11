import { Gameboard } from '../gameboard.js';

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
    makeMove(opponent, x, y) {
        opponent.board.receiveAttack(x, y);
        let hitSquare = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return hitSquare;
    }
}

export { Player }