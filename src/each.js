import isArrayLike from './isArrayLike';
import _keys from './keys';

function each(collection, iteratee){
	let length, i;

	if ( isArrayLike( collection ) ) {
		length = collection.length;
		for ( i = 0; i < length; i++ ) {
			if ( iteratee( collection[ i ], i, collection ) === false ) {
				break;
			}
		}
	} else {
		const keys = _keys(collection);
		
		for ( i = 0, length = keys.length; i < length; i++ ) {
			if ( iteratee( collection[ keys[i] ], keys[i], collection ) === false ) {
				break;
			}
		}
	}

	return collection;	
}

export default each;