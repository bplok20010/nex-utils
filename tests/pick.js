const pick = require('../lib/pick');

var object = { 'a': 1, 'b': '2', 'c': 3 };
 
var ret = pick(object, ['a', 'c']);

console.log(ret);