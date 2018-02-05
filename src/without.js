import difference from './difference';

function without(array, ...values){
	return difference(array, values);
}

export default without;