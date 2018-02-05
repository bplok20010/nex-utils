
export default function(obj){
	return function(key){
		return obj == null ? void 0 : obj[key];	
	}	
}