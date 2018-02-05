const uniq = require('../lib/uniq');
 
var ret = uniq([2, 1, 1,3,4,5,1,4,4,6]);

console.log(ret);