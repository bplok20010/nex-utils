import map from './map';
import pluck from './pluck';

function sortBy(obj, iteratee) {
	let index = 0;
	return pluck(map(obj, function(value, key, list) {
		return {
			value: value,
			index: index++,
			criteria: iteratee(value, key, list)
		};
	}).sort(function(left, right) {
		const a = left.criteria;
		const b = right.criteria;
		if (a !== b) {
			if (a > b || a === void 0) return 1;
			if (a < b || b === void 0) return -1;
		}
		return left.index - right.index;
	}), 'value');
}

export default sortBy;