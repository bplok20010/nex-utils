import keys from './keys';

function isMatch(object, attrs) {
	const _keys = keys(attrs), length = _keys.length;
	if (object == null) return !length;
	const obj = Object(object);
	for (let i = 0; i < length; i++) {
		const key = _keys[i];
		if (attrs[key] !== obj[key] || !(key in obj)) return false;
	}
	return true;
}
  
export default isMatch;