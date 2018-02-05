import baseAssignValue from './_baseAssignValue';
import reduce from './reduce';

function countBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
  	if (hasOwnProperty.call(result, key)) {
    	result[key]++;
    } else {
    	baseAssignValue(result, key, 1)
    }
    return result
  }, {})
}

export default countBy;
