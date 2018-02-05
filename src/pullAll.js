/**
 * Removes all provided values from `array` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.without`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3, 1, 2, 3];
 *
 * _.pullAll(array, [2, 3]);
 * console.log(array);
 * // => [1, 1]
 */
function pullAll(array, values) {
	if (!(array && array.length)) {
		return array;
	}
	let index = 0,
		length = values.length;

	while (++index < length) {
		let fromIndex = 0,
			value = values[index];
	
		while ((fromIndex = array.indexOf(value, fromIndex)) > -1) {
			array.splice(fromIndex, 1);
		}
	}
	
	return array;
}

export default pullAll;