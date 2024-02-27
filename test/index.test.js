import utils from '../es/index.esm'
// const utils = require('../lib/index')
console.log(1111111111111, utils)

test('add test', () => {
  expect(utils.add(1, 2)).toBe(3)
})

test('subtract test', () => {
  expect(utils.subtract(1, 2)).toBe(-1)
})

test('multiply test', () => {
  expect(utils.multiply(1, 2)).toBe(2)
})

test('divide test', () => {
  expect(utils.divide(1, 2)).toBe(0.5)
})
