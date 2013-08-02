
var fs = require('fs'),
argv = require('optimist')
	.usage('Let the Argonauts deal with JSON')
	.demand('f')
	.demand(2)
	.options('f', {
		alias: 'file',
		describe: 'The JSON file to fuck with'
	})
	.string(['f'])
	.options('i', {
		alias: 'increment',
		describe: 'Activate Incrementation Mode'
	})
	.options('a', {
		alias: ['array', 'append'],
		describe: 'Activate Array Mode'
	})
	.options('s', {
		alias: 'semver',
		describe: 'Activate Semantic Versioning Mode'
	})
	.boolean(['i', 'a', 's'])
	.argv;

var file, obj, tabstop, path;

tabstop = 2;

// path =

if (argv._.length % 2 === 1) {
	console.error('Arguments must be supplied in pairs');
	process.exit(1);
}

var mode = 'default';

/**
 * Find the File
 */

path = argv.file;

if (path[0] !== '/') {
	path =  __dirname + '/' + path;
}

try {
	file = fs.readFileSync(path, { encoding: 'utf8' });
} catch (e) {
	console.error('No such file: ' + path);
	process.exit(1);
}

try {
	obj = JSON.parse(file);
} catch (e) {
	console.error('Bad JSON: ' + e);
	process.exit(1);
}

while(argv._.length > 1) {
	// TODO: handle different modes
	var key = argv._.shift();
	var val = argv._.shift();

	var keys = key.split('.');

	var c = obj;

	while(keys.length > 0) {
		if (keys.length === 1) {
			c[keys.shift()] = val;
			break;
		}

		var k = keys.shift();

		if (!c[k]) { c[k] = {}; }

		c = c[k];
	}

	c = val;
}

try {
	string = JSON.stringify(obj, undefined, tabstop);
} catch (e) {
	console.error(e);
	process.exit(1);
}

fs.writeFileSync(path, string);

process.exit(0);
