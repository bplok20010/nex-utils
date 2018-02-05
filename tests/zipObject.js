const zipObject = require('../lib/zipObject');
 
var ret = zipObject(['a', 'b', 'c'], ['1', '2', '3']);

console.log(ret);