import defaults from './defaults';
import escape from './escape';

const escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

const noMatch = /(.)^/;

const escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

const escapeChar = function(match) {
	return '\\' + escapes[match];
};

const inject = {
	escape	
}

const templateSettings = {
	evaluate: /<%([\s\S]+?)%>/g,
	interpolate: /<%=([\s\S]+?)%>/g,
	escape: /<%-([\s\S]+?)%>/g
};

function template(text, settings, oldSettings){
	if (!settings && oldSettings) settings = oldSettings;
	settings = defaults({}, settings, templateSettings);
	
	// Combine delimiters into one regular expression via alternation.
	const matcher = RegExp([
	  (settings.escape || noMatch).source,
	  (settings.interpolate || noMatch).source,
	  (settings.evaluate || noMatch).source
	].join('|') + '|$', 'g');
	
	// Compile the template source, escaping string literals appropriately.
	let index = 0;
	let source = "__p+='";
	text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	  source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
	  index = offset + match.length;
	
	  if (escape) {
		source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	  } else if (interpolate) {
		source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	  } else if (evaluate) {
		source += "';\n" + evaluate + "\n__p+='";
	  }
	
	  // Adobe VMs need the match returned to produce the correct offset.
	  return match;
	});
	source += "';\n";
	
	// If a variable is not specified, place data values in local scope.
	if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	source = "var __t,__p='',__j=Array.prototype.join," +
	  "print=function(){__p+=__j.call(arguments,'');};\n" +
	  source + 'return __p;\n';
	
	let render;
	try {
	  render = new Function(settings.variable || 'obj', '_', source);
	} catch (e) {
	  e.source = source;
	  throw e;
	}
	
	const template = function(data) {
	  return render.call(this, data, inject);
	};
	
	// Provide the compiled source as a convenience for precompilation.
	const argument = settings.variable || 'obj';
	template.source = 'function(' + argument + '){\n' + source + '}';
	
	return template;	
}

export default template;