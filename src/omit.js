import flattenDeep from './flattenDeep';
import basePickBy from './_basePickBy';
import allKeys from './allKeys';

function omit(object, ...paths){
	if (object == null) {
		return {};
	}
	const keys = allKeys(object);
	const cache = {};
	paths = flattenDeep(paths);
	
	for( let i = 0, length = paths.length; i < length; i++  ) {
		cache[paths[i]] = true;	
	}
	
	return basePickBy(object, keys, (value, key) => !cache[key] );
}

export default omit;