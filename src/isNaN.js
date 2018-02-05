import isNumber from './isNumber';

export default function(value){
	return isNumber(value) && isNaN(value);		
}