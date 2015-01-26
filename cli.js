#!/usr/bin/env node

var fs = require('fs')
var sg = require('./')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
    boolean: [
        'help',
        'versions'
    ],
    alias: {
        h: 'help',
        V: 'versions'
    }
})
var pkg = require('./package.json')

if (argv.V) console.log(pkg.version)

if (argv.h) {
    console.log('Usage: specificity-graph input.css');
    console.log('');
    console.log('Options:');
    console.log('');
    console.log('  -V, --versions    output the version number');
    console.log('  -h, --help        output usage information');
}

if (argv._[0]) {
    var css = fs.readFileSync(argv._[0], 'utf-8')
    sg(css)
}
