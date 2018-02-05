import has from './has';

function memoize(func, hasher) {
	const memoize = function(key) {
		const cache = memoize.cache;
		const address = '' + (hasher ? hasher.apply(this, arguments) : key);
		if (!has(cache, address)) cache[address] = func.apply(this, arguments);
		return cache[address];
	};
	memoize.cache = {};
	return memoize;
}

export default memoize;