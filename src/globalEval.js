
const root = self || global;

export default ('execScript' in root) ? function(code) {
	root.execScript(code)
} : function(code) {
	(function(){
		eval(code);
	})();
}
