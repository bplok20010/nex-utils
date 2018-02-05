import includes from './includes';

function baseUniq(array, iteratee){
	var result = [];
	var seen = [];
	for (let i = 0, length = array.length; i < length; i++) {
		var value = array[i],
			computed = iteratee ? iteratee(value, i, array) : value;
		if (iteratee) {
			if (!includes(seen, computed)) {
				seen.push(computed);
				result.push(value);
			}
		} else if (!includes(result, value)) {
			result.push(value);
		}
	}
	return result;	
}

export default baseUniq;