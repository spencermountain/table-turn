var test = require('tape')
var parse = require('../src/02-parse')
var html = require('./_sunset')

test('th-basic:', function(t) {
  let obj = parse(html)[0]
  // [ 'Jan',
  //  'Sunrise',
  //  'Sunset',
  //  'Length',
  //  'Difference',
  //  'Start',
  //  'End',
  //  'Start',
  //  'End',
  //  'Start',
  //  'End',
  //  'Time',
  //  'Mil. km' ]
  t.equal(obj.headers[0], 'Jan')
  t.equal(obj.headers[1], 'Sunrise')
  t.equal(obj.headers.length, 13)
  t.end()
})
