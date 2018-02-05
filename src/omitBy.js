import allKeys from './allKeys';
import basePickBy from './_basePickBy';
import negate from './negate';

function omitBy(object, predicate) {
	if (object == null) {
		return {};
	}
	const keys = allKeys(object);
	return basePickBy(object, keys, negate(predicate));
}

export default omitBy;