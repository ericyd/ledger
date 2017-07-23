import { test } from 'ava';
const calculateCategoryTotals = require('../src/calculateCategoryTotals');
const { transactions } = require('./sample-transactions-response-small');

test('should return an object with all categories as keys', t => {
  const result = calculateCategoryTotals(transactions);
  t.deepEqual(
    ['Vices', 'Pay day', 'Eating out'],
    Object.keys(result),
    'categories doesnt have correct keys'
  );
});

test('each value should be an object with `total` and `transactions` keys', t => {
  const result = calculateCategoryTotals(transactions);
  Object.keys(result).forEach(key => {
    t.deepEqual(
      ['total', 'transactions'],
      Object.keys(result[key]),
      `result[${key}] doesnt have the right keys`
    );
  });
});

test('totals should be a number', t => {
  const result = calculateCategoryTotals(transactions);
  Object.keys(result).forEach(key => {
    t.is(
      typeof result[key].total,
      'number',
      `result.${key}.total isn't a number`
    );
  });
});

test('transactions should be an array', t => {
  const result = calculateCategoryTotals(transactions);
  Object.keys(result).forEach(key => {
    t.is(
      Array.isArray(result[key].transactions),
      true,
      `result.${key}.transactions isn't an array`
    );
  });
});

test('should sum totals for same category', t => {
  const result = calculateCategoryTotals(transactions);
  t.is(result.Vices.total, 125, 'result.Vices.total isnt correct');
  t.is(
    result['Eating out'].total,
    550,
    `result['Eating out'].total isnt correct`
  );
});
