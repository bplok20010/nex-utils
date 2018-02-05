import pad from './pad';

export default function(string, length, chars){
	return pad(string, length, chars, 'right');	
}