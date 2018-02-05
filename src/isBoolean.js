import toString from './toString';
import isObjectLike from './isObjectLike';

export default function(obj){
	return obj === true || obj === false || 
		(isObjectLike(obj) && toString.call(obj) === '[object Boolean]'); 	
}