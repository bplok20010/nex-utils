import identity from './identity';

function createPredicateIndexFinder(dir) {
	return function(array, predicate = identity) {
		const length = array == null ? 0 : array.length;
		if (!length) {
			return -1;
		}
		let index = dir > 0 ? 0 : length - 1;
		for (; index >= 0 && index < length; index += dir) {
			if (predicate(array[index], index, array)) return index;
		}
		return -1;
	};
}

export default createPredicateIndexFinder;