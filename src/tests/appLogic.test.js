import { Ship } from '../ship.js';
import { Gameboard } from '../gameboard.js';

//tests for Ship class
test('ship name is Bob', () => {
  expect(new Ship('Bob').name).toBe('Bob')
});
test('ship length is 3', () => {
  expect(new Ship('Bob', 3).size).toBe(3);
});
test('ship.hits == []', () => {
  expect(new Ship('Bob', 3).hits).toEqual([]);
});
test('ship is sunk', () => {
  expect(new Ship('Bob', 1).hit()).toEqual('sunk!');
});
test('ship is at A1', () => {
  expect(new Ship('Bob', 1, 'A', 1).calculatePosition()).toEqual(expect.objectContaining({
    X: "A",
    Y: 1,
    isHit: false,
  }));
});


test.skip('ship is at A1-A3', () => {
  //put some code in here
})


test('gameboard.grid yields array containing J10', () => {
  expect(new Gameboard().grid[99]).toEqual(expect.objectContaining({
    X: "J",
    Y: 10,
    isHit: false,
  }));
})
test('gameboard.receiveAttack(C, 8) returns true', () => {
  expect(new Gameboard().receiveAttack('C', 8)).toEqual(expect.objectContaining({
    X: "C",
    Y: 8,
    isHit: true,
  }));
})



test('gameboard.populateShips() yields array with A1 square object as only element', () => {
  expect(new Gameboard().populateShip('Bob', 1, 'A', 1)).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "name": "Bob", "size": 1, "xStart": "A", "yStart": 1 }
    }]
  ))
});

test.skip('gameboard.populateShips() yields array with A1 square & A2 square as sole two elements', () => {
  expect(new Gameboard().populateShip('Bob', 2, 'A', 1, 'up')).toEqual(expect.arrayContaining(
    [{
      X: "A",
      Y: 1,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "name": "Bob", "size": 2, "xStart": "A", "yStart": 1 }
    },
    {
      X: "A",
      Y: 2,
      containsShip: true,
      isHit: false,
      ship: { "hits": [], "name": "Bob", "size": 2, "xStart": "A", "yStart": 1 }
    }]
  ))
});

test.skip('receive attack at A1 yields [hit]', () => {
  expect(new Gameboard().populateShip('Bob', 1, 'A', 1).receiveAttack("A", 1))
    .toEqual(expect.objectContaining({
    xStart: "A",
    yStart: 1,
    hits: ["hit"]
    //containsShip: true,
  }))
})