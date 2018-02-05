import findIndex from './findIndex';
import findKey from './findKey';
import isArrayLike from './isArrayLike';

function find(obj, predicate) {
	const keyFinder = isArrayLike(obj) ? findIndex : findKey;
	const key = keyFinder(obj, predicate);
	if (key !== void 0 && key !== -1) return obj[key];
}

export default find;