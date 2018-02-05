import includes from './includes';
import baseFlatten from './_flatten';
import filter from './filter';

function difference(array, ...values){
	values = baseFlatten(values, 1);
	return filter(array, (value) => !includes(values, value));
}

export default difference;