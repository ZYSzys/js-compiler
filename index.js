'use strict';

const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');
const transformer = require('./src/transformer');
const generator = require('./src/generator');
const compiler = require('./src/compiler.js');

module.exports = {
  tokenizer,
  parser,
  transformer,
  generator,
  compiler
}
