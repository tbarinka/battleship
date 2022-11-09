const Ship = require('../appLogic.js');
const Gameboard = require('../appLogic.js');

//tests for Ship class
test('ship name is Bob', () => {
  expect(new Ship('Bob').name).toBe('Bob')
});
test('ship length is 3', () => {
  expect(new Ship('Bob', 3).length).toBe(3);
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