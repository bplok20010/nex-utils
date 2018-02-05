import isArrayLike from './isArrayLike';
import values from './values';
import each from './each';

function min(obj, iteratee) {
	let result = Infinity, lastComputed = Infinity,
		value, computed;
	if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
		obj = isArrayLike(obj) ? obj : values(obj);
		for (let i = 0, length = obj.length; i < length; i++) {
			value = obj[i];
			if (value != null && value < result) {
				result = value;
			}
		}
	} else {
		each(obj, function(v, index, list) {
			computed = iteratee(v, index, list);
			if (computed < lastComputed || computed === Infinity && result === Infinity) {
				result = v;
				lastComputed = computed;
			}
		});
	}
	return result;
}
	
export default min;