const assert = require('assert');
const before = require('../lib/before');
const after = require('../lib/after');
const bind = require('../lib/bind');
const bindKey = require('../lib/bindKey');
const bindAll = require('../lib/bindAll');
const forEach = require('../lib/forEach');

const _ = bind.placeholder;

////////////////after////////////////
var saves = ['profile', 'settings'];
var r = 0;
 
var asyncSave = after(saves.length, function() {
  r++;
});
 
forEach(saves, function(type) {
  asyncSave();
});
//again
asyncSave();

assert(r === 2, 'error call after');
// => Logs 'done saving!' after the two async saves have completed.

////////////////before////////////////
r = 0;
var monthlyMeeting = before(3, function(){
	r++;	
});
monthlyMeeting();
monthlyMeeting();
monthlyMeeting();
monthlyMeeting();
assert(r === 2, 'error call before');

////////////////bind////////////////
function greet(greeting, punctuation) {
  return ( greeting + ' ' + this.user + punctuation );
}
 
var object = { 'user': 'fred' };
 
var bound = bind(greet, object, 'hi');
assert(bound('!') === 'hi fred!', 'call bind error');
// => 'hi fred!'
 
// Bound with placeholders.
var bound = bind(greet, object, _, '!');
assert(bound('hi') === 'hi fred!', 'call bind error');
// => 'hi fred!'

//////////bindKey////////////
var object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
 
var bound = bindKey(object, 'greet', 'hi');
assert(bound('!') === 'hi fred!');
// => 'hi fred!'
 
object.greet = function(greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};
 
assert(bound('!') === 'hiya fred!');
// => 'hiya fred!'
 
// Bound with placeholders.
var bound = bindKey(object, 'greet', _, '!');
assert(bound('hi') === 'hiya fred!');
// => 'hiya fred!'

//////////bindAll////////////
var view = {
  'label': 'docs',
  'click': function() {
    return ('clicked ' + this.label);
  }
};
 
bindAll(view, ['click']);
assert(view.click.call({}) === 'clicked docs');