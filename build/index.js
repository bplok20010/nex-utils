const process = require("process");
const fs = require("fs");
const _ = require("lodash");
const babel = require("babel-core");
const stringify = require("json-stringify-pretty-compact");

var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine(require(__dirname + "/../.eslintrc.json"));

var report = cli.executeOnFiles([__dirname + "/../src/"]);

if( report.errorCount ) {
	report.results.forEach(ret => {
		if( !ret.errorCount ) return;
		ret.messages.forEach( message => {
			console.error(ret.filePath, message)
		} )
	})
	throw new TypeError('eslint error');
}

const pathname = __dirname + '/../src';
const libDir = __dirname + '/../lib';

const depsRegs = /import\s+(.+)\s+from\s+[\'\"](.+)[\'\"][\s\n\r;]/g;

const exportRegs = /export\s+default/g;

const files = [];

_.each(fs.readdirSync(pathname), function(filename) {
	let code = fs.readFileSync(`${pathname}/${filename}`, 'utf8');
	
	if( !code ) return;
	
	code = code.replace(depsRegs, function(a, b, c){
		return `const ${b} = require("${c}");`
	}).replace(exportRegs, function(a, b, c){
		return `module.exports =`
	});
	
	result = babel.transform(code, {
		babelrc: true,
		extends: __dirname + '/../.babelrc'	
	});
	
	console.log(`src/${filename} -> lib/${filename}`);
	
	fs.writeFileSync( `${libDir}/${filename}`, result.code );
	
	files.push(filename);
	
});
	
//create package.json
const pkg = require(__dirname + '/package.json');
fs.writeFileSync( `${libDir}/package.json`, stringify(pkg) );

//create index.js
const codes = [];
_.each(files, function(filename){
	filename = filename.replace('.js', '');
	if( /^_/.test(filename) ) return;
	codes.push(`exports.${filename} = require("./${filename}");`);
});	

fs.writeFileSync( `${libDir}/index.js`, codes.join('\n') );

//create readme.md
fs.writeFileSync( `${libDir}/README.md`, fs.readFileSync(`${pathname}/../README.md`, 'utf8') );



