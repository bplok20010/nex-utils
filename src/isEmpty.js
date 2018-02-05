import isArrayLike from './isArrayLike';
import isArray from './isArray';
import isString from './isString';
import isArguments from './isArguments';
import keys from './keys';

function isEmpty(value){
	if (value == null) return true;
    if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value))) return value.length === 0;
    return keys(value).length === 0;	
}

export default isEmpty;