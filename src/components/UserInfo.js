import React from 'react';

const UserInfo = (props) => {
    return (
        <div>
            <p>{props.username}</p>
            <img src={props.avatar} alt="user avatar" height="42" width="42"/>
        </div>
    )
};

UserInfo.propTypes = {
    username: React.PropTypes.string,
    avatar: React.PropTypes.string
};

export default UserInfo;