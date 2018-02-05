const omit = require('../lib/omit');

var object = { 'a': 1, 'b': '2', 'c': 3 };
 
var ret = omit(object, ['a', 'c']);

console.log(ret);