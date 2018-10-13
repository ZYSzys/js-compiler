'use strict';

const generator = node => {
  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n');

    case 'ExpressionStatement':
      return (generator(node.expression) + ';');

    case 'CallExpression':
      return (
        generator(node.callee) +
        '(' +
        node.arguments.map(generator).join(', ') +
        ')'
      );

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    default:
      throw new TypeError(`Unknown type: ${node.type}`);
  }
}

module.exports = generator;
