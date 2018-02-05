import slice from './slice';

function partial(func){
	const boundArgs = slice(arguments, 1);
	
	return function(){
		const length = boundArgs.length, args = Array(length);
		let position = 0;
		
		for ( let i = 0; i < length; i++ ) {
			args[i] = boundArgs[i] === partial.placeholder ? arguments[position++] : boundArgs[i];
		}
		
		while (position < arguments.length) args.push(arguments[position++]);
		
		return func.apply(this, args); 
	}; 	
}

partial.placeholder = {};

export default partial;