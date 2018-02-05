export default function(array, separator = ','){
	if( array == null ) return '';
	return array.join(separator);
}