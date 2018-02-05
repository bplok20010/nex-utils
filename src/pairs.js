import keys from './keys';

function pairs(obj){
	const objKeys = keys(obj);
    const length = objKeys.length;
    const iarr = Array(length);
    for (let i = 0; i < length; i++) {
    	iarr[i] = [objKeys[i], obj[objKeys[i]]];
    }
    return iarr;	
}

export default pairs;