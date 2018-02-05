import delay from './delay';

function debounce(func, wait, immediate){
	let timeout, result;
	
	const later = function(context, args) {
		timeout = null;
		if (args) result = func.apply(context, args);
	};
	
	var debounced = function(...args) {
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			const callNow = !timeout;
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(this, args);
		} else {
			timeout = delay(later, wait, this, args);
		}
		
		return result;
	};
	
	debounced.cancel = function() {
		clearTimeout(timeout);
		timeout = null;
	};
	
	return debounced;	
}

export default debounce;