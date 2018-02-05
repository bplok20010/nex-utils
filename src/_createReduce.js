import isArrayLike from './isArrayLike';
import _keys from './keys';

function createReduce(dir){
	// Wrap code that reassigns argument variables in a separate function than
	// the one that accesses `arguments.length` to avoid a perf hit. (#1991)
	var reducer = function(obj, iteratee, memo, initial) {
		let keys = !isArrayLike(obj) && _keys(obj),
			length = (keys || obj).length,
			index = dir > 0 ? 0 : length - 1;
		if (!initial) {
			memo = obj[keys ? keys[index] : index];
			index += dir;
		}
		for (; index >= 0 && index < length; index += dir) {
			var currentKey = keys ? keys[index] : index;
			memo = iteratee(memo, obj[currentKey], currentKey, obj);
		}
		return memo;
	};
	
	return function(obj, iteratee, memo) {
		var initial = arguments.length >= 3;
		return reducer(obj, iteratee, memo, initial);
	};	
}

export default createReduce;