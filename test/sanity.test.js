const { test } = require('ava')

test('sanity 1', t => {
  t.pass();
});

test('sanity 2', t => {
  const one = 1;
  const two = 2;
  t.is(one + two, 3, 'uh oh, 1 + 2 != 3');
});