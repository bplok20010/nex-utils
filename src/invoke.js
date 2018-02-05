import map from './map';
import isFunction from './isFunction';

function invoke(list, path, ...args){
	const func = isFunction(path) ? path : null;
	return map(list, context => {
		let method = func;
		if( !method ) {
			if (context == null) return void 0;	
			method = context[path];	
		}
		return method == null ? method : method.apply(context, args);
	});
}

export default invoke;