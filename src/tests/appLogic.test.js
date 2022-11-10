import { Ship } from '../ship.js';
import { Gameboard } from '../gameboard.js';
//const Ship = require('../ship.js');
//const Gameboard = require('../gameboard.js');

//tests for Ship class
test('ship name is Bob', () => {
  expect(new Ship('Bob').name).toBe('Bob')
});
test('ship length is 3', () => {
  expect(new Ship('Bob', 3).size).toBe(3);
});
test('ship.hits == [hit]', () => {
  expect(new Ship('Bob', 3).hit()).toEqual(['hit']);
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
    containsShip: true,
    shipName: 'Bob',
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
