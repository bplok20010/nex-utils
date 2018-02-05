const groupBy = require('../lib/groupBy');

var ret = groupBy([6.1, 4.2, 6.3], Math.floor);

console.log(ret);