import baseUniq from './_baseUniq';
import baseFlatten from './_flatten';
import isArrayLikeObject from './isArrayLikeObject';

function union(...arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
}

export default union