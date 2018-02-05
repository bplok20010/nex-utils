import isFunction from './isFunction';
import bind from './bind';

function bindKey( object, key, ...args ) {
	if (!isFunction(object[key])) throw new TypeError('Bind must be called on a function');
	
	return bind(function(){
		return object[key].apply(this, arguments);	
	}, object, ...args);
}

export default bindKey;