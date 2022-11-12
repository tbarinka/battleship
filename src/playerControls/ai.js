import { Gameboard } from '../gameAppLogic/gameboard.js';
import { Player } from './player.js';

class AI {
    constructor(opponent) {
        this.board = new Gameboard();
        this.opponent = opponent;
    }
    makeMove(opponent) {
        let array = this.randomParameter(opponent);
        let x = array[0];
        let y = array[1];
        opponent.board.receiveAttack(x, y);
        let hitSquare = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return hitSquare;
    }
    makeMoveNonRandom(opponent, x, y) {
        opponent.board.receiveAttack(x, y);
        let hitSquare = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return hitSquare;
    }
    randomParameter(opponent) {
        let x = opponent.board.xAxis[Math.trunc(Math.random() * 9)];
        let y = opponent.board.yAxis[Math.trunc(Math.random() * 9)];
        //let square = opponent.board.grid.find(square => (square.X == x && square.Y == y));
        return [x, y];
    }
}

export { AI }