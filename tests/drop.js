const drop = require('../lib/drop');
const dropRight = require('../lib/dropRight');
 
var ret = drop([1, 2, 3], 1);

console.log(ret);

var ret = dropRight([1, 2, 3], 1);

console.log(ret);