import isArrayLike from './isArrayLike';
import _keys from './keys';

function every(obj, predicate){
	let keys = !isArrayLike(obj) && _keys(obj),
        length = (keys || obj).length;
    for (let index = 0; index < length; index++) {
    	const currentKey = keys ? keys[index] : index;
    	if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
	
    return true;	
}

export default every;