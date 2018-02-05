import findIndex from './findLastIndex';
import findKey from './findKey';
import isArrayLike from './isArrayLike';

function findLast(obj, predicate) {
	const keyFinder = isArrayLike(obj) ? findIndex : findKey;
	const key = keyFinder(obj, predicate);
	if (key !== void 0 && key !== -1) return obj[key];
}

export default findLast;