import baseCreate from './_baseCreate';

function setCache(values){
	const Caches = baseCreate(null);
	let index = -1;
    const length = values == null ? 0 : values.length;

    while (++index < length) {
    	Caches[values[index]] = true;
    }
	
	return Caches;
}

export default setCache;