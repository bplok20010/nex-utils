import flatten from './flatten';
import bind from './bind';

function bindAll(obj, keys){
	keys = flatten(keys);
	let index = keys.length;
	if (index < 1) throw new Error('bindAll must be passed function names');
	while (index--) {
		const key = keys[index];
		obj[key] = bind(obj[key], obj);
	}
}

export default bindAll;