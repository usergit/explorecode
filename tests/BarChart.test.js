import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import {createRenderer} from 'react-addons-test-utils';

import BarChart from '../src/components/BarChart'; //import component

const test     = addAssertions(tape, {jsxEquals});
const renderer = createRenderer();

test('Testing Bar Chart ', function (assert) {
    const barSize = "0%";
    renderer.render(<BarChart/>);

    const expected = (
        <div className="progress" style={{marginBottom: "0"}}>
            <div className="progress-bar" width="200" style={{ width: barSize}}></div>
        </div>
    );
    const actual   = renderer.getRenderOutput();

    assert.deepEqual(actual, expected, `should render a barchart with width: ${barSize}`);
    assert.end();
});

test('Testing Bar Chart ', function (assert) {
    const barSize = "0%";
    renderer.render(<BarChart size={barSize} />);

    const expected = (
        <div className="progress" style={{marginBottom: "0"}}>
            <div className="progress-bar" width="200" style={{ width: barSize}}></div>
        </div>
    );
    const actual   = renderer.getRenderOutput();

    assert.deepEqual(actual, expected, `should render a barchart with width: ${barSize}`);
    assert.end();
});

test('Testing Bar Chart ', function (assert) {
    const barSize = "50%";
    renderer.render(<BarChart size={barSize} />);

    const expected = (
        <div className="progress" style={{marginBottom: "0"}}>
            <div className="progress-bar" width="200" style={{ width: barSize}}></div>
        </div>
    );
    const actual   = renderer.getRenderOutput();

    assert.deepEqual(actual, expected, `should render a barchart with width: ${barSize}`);
    assert.end();
});

test('Testing Bar Chart ', function (assert) {
    const barSize = "100%";
    renderer.render(<BarChart size={barSize} />);

    const expected = (
        <div className="progress" style={{marginBottom: "0"}}>
            <div className="progress-bar" width="200" style={{ width: barSize}}></div>
        </div>
    );
    const actual   = renderer.getRenderOutput();

    assert.deepEqual(actual, expected, `should render a barchart with width: ${barSize}`);
    assert.end();
});