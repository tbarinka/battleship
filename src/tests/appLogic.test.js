import { Ship } from '../gameAppLogic/ship.js';
import { Gameboard } from '../gameAppLogic/gameboard.js';
import { Player } from '../playerControls/player.js';
import { AI } from '../playerControls/ai.js';

let board = new Gameboard();
board.populateShip(1, 'A', 1);

//tests for Ship class
test('ship length is 3', () => {
  expect(new Ship(3).size).toBe(3);
});
test('ship.hits == []', () => {
  expect(new Ship(3).hits).toEqual([]);
});
test('ship is sunk', () => {
  expect(new Ship(1).hit()).toEqual('sunk!');
});
test('gameboard.grid yields array containing J10', () => {
  expect(new Gameboard().grid[99]).toEqual(expect.objectContaining({
    X: "J",
    Y: 10,
    isHit: false,
  }));
})


//Testing Gameboard.populateShip() method
test('populates ship at A1 with size of 1 square', () => {
  expect(new Gameboard().populateShip(1, 'A', 1)).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 1, "xStart": "A", "yStart": 1 }
    }]
  ))
});
test('populate ship at A1-A3 with size of 3 squares pointing south', () => {
  expect(new Gameboard().populateShip(3, 'A', 1, 'south')).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    },
    {
      X: "A",
      Y: 2,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    },
    {
      X: "A",
      Y: 3,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    }]
  ))
});
test('populate ship at A1-A3 with size of 3 squares pointing north', () => {
  expect(new Gameboard().populateShip(3, 'A', 3, 'north')).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 3,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 3 }
    },
    {
      X: "A",
      Y: 2,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 3 }
    },
    {
      X: "A",
      Y: 3,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 3 }
    }]
  ))
});
test('populate ship at A1-C1 with size of 3 squares pointing east', () => {
  expect(new Gameboard().populateShip(3, 'A', 1, 'east')).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    },
    {
      X: "B",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    },
    {
      X: "C",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "A", "yStart": 1 }
    }]
  ))
});
test('populate ship at C1-A1 with size of 3 squares pointing west', () => {
  expect(new Gameboard().populateShip(3, 'C', 1, 'west')).toEqual(expect.arrayContaining(
    [{
      X: "C",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "C", "yStart": 1 }
    },
    {
      X: "B",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "C", "yStart": 1 }
    },
    {
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "size": 3, "xStart": "C", "yStart": 1 }
    }]
  ))
});
test('return "overflow!" for a ship that overflows north side of grid', () => {
  expect(new Gameboard().populateShip(3, 'A', 8, "north")).toEqual('overflow!');
})
test('return "overflow!" for a ship that overflows south side of grid', () => {
  expect(new Gameboard().populateShip(3, 'A', 10, "south")).toEqual('overflow!');
})
test('return "overflow!" for a ship that overflows west side of grid', () => {
  expect(new Gameboard().populateShip(3, 'A', 1, "west")).toEqual('overflow!');
});
test('return "overflow!" for a ship that overflows east side of grid', () => {
  expect(new Gameboard().populateShip(3, 'I', 1, "east")).toEqual('overflow!');
});

test('receiveAttack at A1 yields ship with 1 [hit]', () => {
  expect(board.receiveAttack("A", 1))
    .toEqual(expect.objectContaining({
      xStart: "A",
      yStart: 1,
      hits: ["hit"]
    }))
});

//testing player makeMove
test('ai.board.receiveAttack yields a hit via player.makeMove()', () => {
  let player = new Player('John');
  let ai = new AI();
  //ai.board.populateShip(1, 'A', 1);
  player.makeMove(ai, 'A', 1);
  expect(ai.board.grid.find(square => (square.X == 'A' && square.Y == 1))).toEqual(expect.objectContaining({
    X: 'A',
    Y: 1,
    isHit: true,
  }));
});
test('ai.board.receiveAttack sinks AI ship via player.makeMove()', () => {
  let player = new Player('John');
  let ai = new AI();
  ai.board.populateShip(1, 'A', 1);
  player.makeMove(ai, 'A', 1);
  let hitSquare = ai.board.grid.find(square => (square.X == 'A' && square.Y == 1))
  expect(hitSquare.ship.isSunk()).toBe('sunk!');
});

//testing AI makeMove
test('player.board.receiveAttack yields a hit via ai.makeMove()', () => {
  let player = new Player('John');
  let ai = new AI();
  ai.makeMove(player);
  expect(player.board.grid.find(square => (square.isHit == true))).toEqual(expect.objectContaining({
    isHit: true
  }));
});
test('player.board.receiveAttack sinks player ship via ai.makeMove()', () => {
  let player = new Player('John');
  let ai = new AI();
  player.board.populateShip(1, 'A', 1);
  ai.makeMoveNonRandom(player, 'A', 1);
  let hitSquare = player.board.grid.find(square => (square.X == 'A' && square.Y == 1))
  expect(hitSquare.ship.isSunk()).toBe('sunk!');
});

//testing AI.randomParameter() for executing makeMove
test('AI.randomParameter() yields an array with a letter at arr[0]', () => {
  let ai = new AI();
  let player = new Player();
  let array = ai.randomParameter(player);
  let boolean;
  if (typeof array[0] === 'string') { boolean = true }
  //expect(array).toEqual(2);
  expect(boolean).toEqual(true);
});
test('AI.randomParameter() yields an array with a number at arr[1]', () => {
  let ai = new AI();
  let player = new Player();
  let array = ai.randomParameter(player);
  let boolean;
  if (typeof array[1] === 'number') { boolean = true }
  //expect(array).toEqual(2);
  expect(boolean).toEqual(true);
});