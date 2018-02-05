import baseAssignValue from './_baseAssignValue';
import reduce from './reduce';

function indexBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
  	baseAssignValue(result, key, value)
    return result
  }, {})
}

export default indexBy;
