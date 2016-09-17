import React from 'react';
import {observer} from 'mobx-react';

const BarChart = observer((props) => {
    return (
        <div className="progress" style={{marginBottom: "0"}}>
            <div className="progress-bar" width="200" style={{width: props.size}}></div>
        </div>
    )
});

BarChart.propTypes = {
    size: React.PropTypes.string
};

export default BarChart