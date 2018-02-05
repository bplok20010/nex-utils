import filter from './filter';
import map from './map';
import isArrayLikeObject from './isArrayLikeObject';

function unzip(array) {
	if (!(array != null && array.length)) {
		return []
	}
	let length = 0;
	
	array = filter(array, (group) => {
		if (isArrayLikeObject(group)) {
			length = Math.max(group.length, length)
			return true
		}
	});
	
	const result = Array(length);
	
	for (let index = 0; index < length; index++) {
		result[index] = map(array, item => item[index]);	
	}
	return result;
}

export default unzip;