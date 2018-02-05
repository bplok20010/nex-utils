import each from './each';

function filter(collection, predicate){
	const results = [];
	let resIndex = 0;
	
	each( collection, function(value, index, collect){
		if( predicate(value, index, collect) ) results[resIndex++] = value; 
	} );
	
	return results;
}

export default filter;