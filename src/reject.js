import filter from './filter';
import negate from './negate';

function reject(collection, predicate){
	return filter(collection, negate(predicate));	
}

export default reject;