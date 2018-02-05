import toString from './toString';

export default function(obj){
	return toString.call(obj) === '[object Set]'; 	
}