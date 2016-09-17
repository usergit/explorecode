import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Button from '../src/components/button'; //import component

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

function add(a, b) {
    return a+b;
}

test('the add method', function (assert) {
    const expected = 3;
    const actual = add(1, 2);

    assert.equal(actual, expected, 'should add two numbers correctly');
    assert.end();
});


test('Testing Button Component ', function (assert) {
    renderer.render(<Button/>);

    const expected = <Button></Button>;
    const actual = renderer.getRenderOutput();

    assert.equal(actual, expected, 'should render button');
    assert.end();
});