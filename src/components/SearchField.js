import React from 'react';

const SearchField = (props) => {
    return <input placeholder={props.placeholder}
                  onChange={props.handleChange}
                  type={props.type}
                  min={props.min}/>
};

SearchField.propTypes = {
    name        : React.PropTypes.string,
    placeholder : React.PropTypes.string,
    handleChange: React.PropTypes.func,
    type        : React.PropTypes.string,
    min         : React.PropTypes.number,
};

export default SearchField;