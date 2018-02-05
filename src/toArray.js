import isArrayLike from './isArrayLike';
import isString from './isString';
import values from 'values';
import copyArray from './_copyArray';

const reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

function toArray(obj){
	if (!obj) return [];
    if (isArrayLike(obj)) copyArray(obj);
    if (isString(obj)) {
      	// Keep surrogate pair characters together
    	return obj.match(reStrSymbol);
    }
    return values(obj);	
}

export default toArray;