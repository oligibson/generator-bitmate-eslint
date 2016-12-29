const test = require('ava');
const _ = require('lodash');
const Utils = require('bitmate-generator').TestUtils;
const u = require('../utils');

let context;

function merge(args) {
  const result = {};
  _.mergeWith(result, ...args, (x, y) => {
    if (_.isArray(x)) {
      return _.uniq(x.concat(y));
    }
  });
  return result;
}

test.before(() => {
  context = Utils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test('Configuring package.json: react/webpack/babel', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'webpack', js: 'babel'});
  const expected = merge([u.base, u.reactBase, u.webpackBase, u.babelBase, u.babelTypescriptBase, {
    devDependencies: {
      'babel-core': '^6.13.0',
      'babel-polyfill': '^6.7.4'
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/webpack/js', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'webpack', js: 'js'});
  const expected = merge([u.base, u.reactBase, u.webpackBase, u.jsBase, {
    devDependencies: {
      'babel-core': '^6.13.0',
      'babel-polyfill': '^6.7.4'
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/webpack/ts', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'webpack', js: 'typescript'});
  const expected = merge([u.base, u.reactBase, u.webpackBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('react/systemjs/babel', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'systemjs', js: 'babel'});
  const expected = merge([u.base, u.reactBase, u.systemjsBase, u.systemjsReactBase, u.babelBase, u.babelTypescriptBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.13.0'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.10'}
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/systemjs/ts', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'systemjs', js: 'typescript'});
  const expected = merge([u.base, u.reactBase, u.systemjsBase, u.systemjsReactBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/systemjs/js', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'systemjs', js: 'js'});
  const expected = merge([u.base, u.reactBase, u.jsBase, u.systemjsBase, u.systemjsReactBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.13.0'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.10'}
    },
    devDependencies: {
      'babel-core': '^6.13.0',
      'babel-polyfill': '^6.7.4'
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/bower/babel', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'bower', js: 'babel'});
  const expected = merge([u.base, u.reactBase, u.injectBase, u.babelBase, u.injectReactBase, u.babelTypescriptBase, {
    devDependencies: {'gulp-babel': '^6.1.0'}
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/bower/js', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'bower', js: 'js'});
  const expected = merge([u.base, u.reactBase, u.injectBase, u.injectReactBase, u.jsBase, {
    devDependencies: {
      'gulp-babel': '^6.1.0',
      'babel-core': '^6.13.0',
      'babel-polyfill': '^6.7.4'
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: react/bower/ts', t => {
  Utils.call(context, 'configuring.pkg', {client: 'react', modules: 'bower', js: 'typescript'});
  const expected = merge([u.base, u.reactBase, u.injectBase, u.injectReactBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});
