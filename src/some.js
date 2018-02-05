import isArrayLike from './isArrayLike';
import keys from './keys';

function every(obj, predicate){
	let _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (let index = 0; index < length; index++) {
    	const currentKey = _keys ? _keys[index] : index;
    	if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
	
    return false;	
}

export default every;