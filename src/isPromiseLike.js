import isFunction from './isFunction';

export default function(promise){
	return promise && isFunction(promise.then);	
}