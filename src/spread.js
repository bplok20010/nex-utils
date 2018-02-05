
function spread(func){
	return function(args){
		return func.apply(this, args);
	};
}

export default spread;