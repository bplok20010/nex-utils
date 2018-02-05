
function times(n, iteratee){
	const accum = Array(Math.max(0, n));
	for (let i = 0; i < n; i++) accum[i] = iteratee(i);
	return accum;	
}

export default times;