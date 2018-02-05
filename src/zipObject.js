import baseAssignValue from './_baseAssignValue'

function zipObject(list, values) {
	const result = {};
	
	list || ( list = [] );
	list || ( values = [] );
	
	for (var i = 0, length = list.length; i < length; i++) {
		baseAssignValue( result, list[i], values[i] )
	}
	return result;	
}

export default zipObject;