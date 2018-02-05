import toString from './toString';

const class2type = {
	"[object Boolean]": "boolean",	
	"[object Number]": "number",
	"[object String]": "string",
	"[object Function]": "function",
	"[object Array]": "array",
	"[object Date]": "date",
	"[object Object]": "object",
	"[object Error]": "error",
	"[object Symbol]": "symbol",
	"[object Set]": "set",
	"[object Map]": "map"
};

function typeOf(value){
	if ( value == null ) {
		return value + "";
	}
	
	return typeof value === "object" || typeof value === "function" ?
			class2type[ toString.call( value ) ] || "object" :
			typeof value;
}

export default typeOf;