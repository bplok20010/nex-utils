import isFunction from './isFunction';
import partial from './partial';

const _bind = Function.prototype.bind;

function bind(func, context, ...args){
	if (!isFunction(func)) throw new TypeError('Bind must be called on a function');
	
	if( !args.length && _bind ) return _bind.call(func, context);
	
	const result = partial(func, ...args);
	return function(){
		return result.apply(context, arguments);
	}	
}

bind.placeholder = partial.placeholder;

export default bind;