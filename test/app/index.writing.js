const path = require('path');
const spies = require('chai-spies');
const chai = require('chai');
const expect = chai.expect;
chai.use(spies);
const test = require('ava');
const Utils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = Utils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test('Wiring with angular1/webpack/babel', () => {
  const spy1 = chai.spy.on(context, 'replaceInFileWithTemplate');
  const spy2 = chai.spy.on(context, 'copyTemplate');
  Utils.call(context, 'writing.wiring', {client: 'angular1', modules: 'webpack', js: 'babel'});
  expect(spy1).to.have.been.called.exactly(0);
  expect(spy2).to.have.been.called.twice();
});

test('Wiring with angular2/systemjs', () => {
  const spy = chai.spy.on(context, 'copyTemplate');
  Utils.call(context, 'writing.wiring', {client: 'angular2', modules: 'systemjs'});
  expect(spy).to.have.been.called.twice();
});

test('Wiring with angular1/bower/js', () => {
  const spy1 = chai.spy.on(context, 'replaceInFileWithTemplate');
  const spy2 = chai.spy.on(context, 'copyTemplate');
  Utils.call(context, 'writing.wiring', {client: 'angular1', modules: 'bower', js: 'js'});
  expect(spy1).to.have.been.called.twice();
  expect(spy2).to.have.been.called.twice();
});

test('Wiring with react/webpack/typescript', () => {
  const spy1 = chai.spy.on(context, 'replaceInFileWithTemplate');
  const spy2 = chai.spy.on(context, 'copyTemplate');
  Utils.call(context, 'writing.wiring', {client: 'react', modules: 'webpack', js: 'typescript'});
  expect(spy1).to.have.been.called.exactly(0);
  expect(spy2).to.have.been.called.once();
});
