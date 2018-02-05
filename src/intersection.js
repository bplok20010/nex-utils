import contains from './contains';

function intersection(array, ...values){
	const length = array == null ? 0 : array.length;
	if( !length ) return [];
	const result = [];
	const argsLength = values.length;
	for (let i = 0; i < length; i++) {
		const item = array[i];
		if (contains(result, item)) continue;
		let j;
		for (j = 0; j < argsLength; j++) {
			if (!contains(values[j], item)) break;
		}
		if (j === (argsLength - 1)) result.push(item);
	}
	return result;
}

export default intersection;