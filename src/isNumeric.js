import isNumber from './isNumber';
import isString from './isString';
import isNaN from './isNaN';

function isNumeric(value){
	return ( isNumber(value) || isString(value) ) &&
			!isNaN( value - parseFloat( value ) );	
}

export default isNumeric;