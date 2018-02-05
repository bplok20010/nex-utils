const template = require('../lib/template');

var compiled = template("hello: <%= name %>");
console.log(compiled({name: 'moe'}));
//=> "hello: moe"

var compiled = template("<b><%- value %></b>");
console.log(compiled({value: '<script>'}));
//=> "<b>&lt;script&gt;</b>"

var compiled = template("<% print('Hello ' + epithet); %>");
console.log(compiled({epithet: "stooge"}));
//=> "Hello stooge"

var ret = template("Using 'with': <%= data.answer %>", {variable: 'data'})({answer: 'no'});
//=> "Using 'with': no"
console.log(ret);

var compiled = template("Hello {{ name }}!", {
	interpolate: /\{\{(.+?)\}\}/g	
});
console.log(compiled({name: "Mustache"}));
//=> "Hello Mustache!"