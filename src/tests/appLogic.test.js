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





test.skip('gameboard.populateShips() yields ship object', () => {
  expect(new Gameboard().populateShip('Bob', 1, 'A', 1)).toEqual(expect.objectContaining({
    name: "Bob",
    xStart: "A",
    yStart: 1,
    hits: [],
    //containsShip: true,
  }))
})
test.skip('gameboard.populateShips() yields ship at A1', () => {
  expect(new Gameboard().populateShip('Bob', 1, 'A', 1)).toEqual(expect.objectContaining({
    X: "A",
    Y: 1,
    containsShip: true
    //containsShip: true,
  }))
})

test.skip('receive attack at A1 yields [hit!]', () => {
  expect(new Gameboard())
})