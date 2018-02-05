import slice from './slice';

function delay(func, wait){
	const args = slice(arguments, 2);
	
	return setTimeout(function(){
		return func.apply(undefined, args);
	}, wait || 0);	
}

export default delay;