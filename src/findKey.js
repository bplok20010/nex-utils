import keys from './keys';
import identity from './identity';

function findKey(obj, predicate = identity) {
	let objKeys = keys(obj), key;
	for (let i = 0, length = keys.length; i < length; i++) {
		key = objKeys[i];
		if (predicate(obj[key], key, obj)) return key;
	}
}

export default findKey;