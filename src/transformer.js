'use strict';

const traverser = (ast, visitor) => {

  const traverseArray = (array, parent) => {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  };

  const traverseNode = (node, parent) => {
    const method = visitor[node.type];

    if (method) {
      method(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      case 'NumberLiteral':
        break;

      default:
        throw new TypeError(`Unknown type: ${node.type}`);
    }
  }

  traverseNode(ast, null);
};

module.exports = ast => {
  const newAst = {
    type: 'Program',
    body: []
  };

  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: (node, parent) => {
      parent._context.push({
        type: 'NumberLiteral',
        value: node.value
      });
    },

    CallExpression: (node, parent) => {
      let expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };

      node._context = expression.arguments;

      if (parent.type !== 'CallExpression') {
        expression = {
          type: 'ExpressionStatement',
          expression
        };
      }

      parent._context.push(expression);
    }
  });

  return newAst;
}
