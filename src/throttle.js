import now from './now';

function throttle(func, wait, options){
	let timeout, context, args, result;
	let previous = 0;
	if (!options) options = {};
	
	const later = function(context, args) {
		previous = options.leading === false ? 0 : now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	
	const throttled = function() {
		const curr = now();
		if (!previous && options.leading === false) previous = curr;
		const remaining = wait - (curr - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = curr;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
	
	throttled.cancel = function() {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};
	
	return throttled;	
}

export default throttle;