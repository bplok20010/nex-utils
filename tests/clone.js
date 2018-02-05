const clone = require('../lib/clone');
 
var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = clone(objects);
console.log(deep[0] === objects[0]);

var deep = clone(objects, true);
console.log(deep[0] === objects[0]);