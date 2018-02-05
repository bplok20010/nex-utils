import allKeys from './allKeys';
import basePickBy from './_basePickBy';

function pickBy(object, predicate) {
	if (object == null) {
		return {};
	}
	const keys = allKeys(object);
	return basePickBy(object, keys, predicate);
}

export default pickBy;