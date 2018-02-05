import isArray from './isArray';
import keys from './keys';
import identity from './identity';

function map(collection, iteratee = identity){
	let _keys = !isArray(collection) && keys(collection),
	  length = (_keys || collection).length,
	  results = Array(length);	
	  
	for (let index = 0; index < length; index++) {
		let currentKey = _keys ? _keys[index] : index;
		results[index] = iteratee(collection[currentKey], currentKey, collection);
	}
	
	return results;
}

export default map;