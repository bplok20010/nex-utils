const partial = require('../lib/partial');
const _ = partial.placeholder;

function greet(greeting, name) {
  console.log( greeting + ' ' + name );
}
 
var sayHelloTo = partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// Partially applied with placeholders.
var greetFred = partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'