const fill = require('../lib/fill');
 
 var array = [1, 2, 3];
 
var ret = fill(array, 'a');

console.log(ret);

var ret = fill([4, 6, 8, 10], '*', 1, 3);

console.log(ret);