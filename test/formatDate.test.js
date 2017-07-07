const { test } = require('ava');
const formatDate = require('../src/formatDate');

test('formatDate', t => {
  const d = formatDate(new Date('07-06-2017'));
  t.is(d, '2017-07-06');
})