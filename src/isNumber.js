import toString from './toString';
import isObjectLike from './isObjectLike';

function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && toString.call(value) == '[object Number]');
}

export default isNumber;
