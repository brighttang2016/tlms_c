/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var postcss = require('postcss');

var mincss = require('../index');

var dirFixtures = path.join(__dirname, 'fixtures');
var dirExpected = path.join(__dirname, 'expected');
var input = '';
var expected = '';
var opts = {};
var loadInput = function (name) {
  return fs.readFileSync(path.join(dirFixtures, name + '.css'), {
    encoding: 'utf8'
  });
};
var loadExpected = function (name) {
  return fs.readFileSync(path.join(dirExpected, name + '.css'), {
    encoding: 'utf8'
  });
};

exports.testPublicInterfaces = function (test) {
  test.expect(4);

  input = '.foo{color:black}';
  expected = postcss.parse(input);
  test.strictEqual(mincss.minify(input).css, expected.toString());

  opts.map = true;
  test.strictEqual(
    mincss.minify(input, opts).map,
    expected.toResult(opts).map
  );

  test.strictEqual(
    postcss().use(mincss.processor).process(input).css,
    expected.toString()
  );

  mincss.preserveHacks = true;
  var testCase = 'preserve-hacks';
  input = loadInput(testCase);
  expected = loadExpected(testCase);
  test.strictEqual(mincss.minify(input).css, expected);

  mincss.preserveHacks = false;

  test.done();
};

exports.testRealCSS = function (test) {
  test.expect(6);

  var testCases = [
    'simple',
    'extra-semicolons',
    'empty-declarations',
    'single-charset',
    'value',
    'issue3'
  ];

  for (var i = 0, l = testCases.length; i < l; i++) {
    var testCase = testCases[i];
    input = loadInput(testCase);
    expected = loadExpected(testCase);
    test.strictEqual(mincss.minify(input).css, expected);
  }

  test.done();
};
