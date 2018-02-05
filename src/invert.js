import keys from './keys';

function invert(obj) {
	const result = {};
	const objKeys = keys(obj);
	for (var i = 0, length = objKeys.length; i < length; i++) {
		result[obj[objKeys[i]]] = objKeys[i];
	}
	return result;
}

export default invert;