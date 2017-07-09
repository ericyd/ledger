import { test } from 'ava';
const formatAsCurrency = require('../src/formatAsCurrency');

test('formatAsCurrency accepts a string without a decimal', t => {
  const value = '300';
  const result = formatAsCurrency(value);
  t.is(result, '$300.00', 'did not format "300" correctly');
});

test('formatAsCurrency accepts a string with a decimal', t => {
  const value = '300.24';
  const result = formatAsCurrency(value);
  t.is(result, '$300.24', 'did not format "300.24" correctly');
});

test('formatAsCurrency returns the value if it contains a currency symbol', t => {
  const value = '$300';
  const result = formatAsCurrency(value);
  t.is(result, value, 'did not format "$300" correctly');
});

test('formatAsCurrency will place the minus sign in front of the currencySymbol', t => {
  const value = '-400';
  const result = formatAsCurrency(value);
  t.is(result, '-$400.00', 'did not format "-400" correctly');
});

test('formatAsCurrency will format numbers correctly', t => {
  const value = 300;
  const result = formatAsCurrency(value);
  t.is(result, '$300.00', 'did not format number 300 correctly');
});

test('formatAsCurrency will add a leading 0 to numbers where 0 < number < 1', t => {
  const value = 0.05;
  const result = formatAsCurrency(value);
  t.is(result, '$0.05', 'did not format number 0.05 correctly');
});

test('formatAsCurrency will format negative values correctly', t => {
  const value = -45.45;
  const result = formatAsCurrency(value);
  t.is(result, '-$45.45', 'did not format number 45.45 correctly');
});

test('formatAsCurrency can use custom currencySymbols', t => {
  const value = -45.45;
  const currencySymbol = 'L'
  const result = formatAsCurrency(value, currencySymbol);
  t.is(result, '-L45.45', 'did not format number 45.45 correctly');
});

test('formatAsCurrency will return value if custom symbol is passed', t => {
  const value = 'L45';
  const currencySymbol = 'L'
  const result = formatAsCurrency(value, currencySymbol);
  t.is(result, 'L45', 'did not format "L45" correctly');
});
