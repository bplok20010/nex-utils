import hasOwn from './hasOwn';

function has(obj, key) {
	return obj != null && hasOwn.call(obj, key)
}

export default has;