/* jshint node: true */
'use strict';

var postcss = require('postcss');
var onecolor = require('onecolor');

var mincss = exports;

// Declaration
var _opts = {};
var _rePropString = /^(content|font-family)$/i;
var _rePropTwoZeros = /^(background-position|(-(moz|webkit|o|ms)-)?transform-origin)$/i;
var _reValueZero = /(^|\s)(0)(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)/gi;
var _reValueSeriesOfZeros = /^0(\s0){1,3}$/;
var _reValueFloatWithZero = /(^|\s)0+\.(\d+)/g;
var _reValueColorFunction = /(^|\s)((?:rgb|hsl)\s*\(\s*(?:[\d.]+%?(?:\s*,\s*|\s*\))){3})/g;
var _reValueColorHex = /(^|\s)#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])/g;
var _toHex = function (m, space, color) {
  return space + onecolor(color).hex();
};
var _minHex = function (m, space, r1, r2, g1, g2, b1, b2) {
  if (r1 === r2 && g1 === g2 && b1 === b2) {
    m = space + '#' + r1 + g1 + b1;
  }

  return m;
};

var _minDecl = function (decl) {
  if (_opts.preserveHacks) {
    decl.before = decl.before.replace(/[;\s]/g, '');
    decl.between = decl.between.replace(/\s/g, '');
  } else {
    decl.before = '';
    decl.between = ':';
  }

  var value = decl.value;

  if (!_rePropString.test(decl.prop)) {
    value = value.replace(_reValueZero, '$1$2');

    if (!_rePropTwoZeros.test(decl.prop)) {
      value = value.replace(_reValueSeriesOfZeros, '0');
    }

    value = value.replace(_reValueFloatWithZero, '$1.$2');
  }

  value = value.replace(_reValueColorFunction, _toHex);
  value = value.replace(_reValueColorHex, _minHex);
  decl.value = value;
};

// Ruleset
var _isDecl = function (decl) {
  return (decl.type === 'decl');
};

var _minRule = function (rule) {
  if (rule.decls.length === 0 || !rule.decls.some(_isDecl)) {
    rule.removeSelf();

    return;
  }

  rule.before = '';
  rule.selector = rule.selectors.join(',');
  rule.between = '';
  rule.semicolon = false;
  rule.after = '';
};

// At-Rule
var _metCharset = false;

var _minAtRule = function (atRule) {
  if (atRule.name === 'charset') {
    if (_metCharset) {
      atRule.removeSelf();

      return;
    }

    _metCharset = true;
  }

  atRule.before = '';
  atRule.between = '';
  atRule.after = '';
};

// Comment
var _minComment = function (comment) {
  var firstChar = comment.text.charAt(0);
  var isSpecialComment = (firstChar === '!' || firstChar === '#');
  if (_opts.preserveComments && isSpecialComment) {
    comment.before = '';
  } else {
    comment.removeSelf();
  }
};

// PostCSS Processor
mincss.processor = function (opts, css) {
  //hacky: this is not async so we can get away with this
  _opts = opts;
  css.eachDecl(_minDecl);
  css.eachRule(_minRule);
  _metCharset = false;
  css.eachAtRule(_minAtRule);
  css.eachComment(_minComment);
  css.after = '';

  return css;
};

// Minify CSS
mincss.minify = function (css, opts) {
  opts = opts || {};
  var instance = postcss();
  if (opts.preProcessor) {
    instance.use(opts.preProcessor);
  }
  instance.use(mincss.processor.bind(null, opts));
  return instance.process(css, opts);
};
