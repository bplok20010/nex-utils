import toString from './toString';

export default function(obj){
	return typeof obj == 'object' && obj !== null && toString.call(obj) === '[object Arguments]'; 	
}