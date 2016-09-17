import React from 'react';

const UserInfo = (props) => {
    return (
        <div className="well well-sm">
            <img src={props.avatar}
                 alt="user avatar"
                 height="42" width="42"
                 className="img-thumbnail"
                 style={{float: "left"}}/>
            <h5>&nbsp;{props.username}  has  <strong>{props.repoCount}</strong> repositories</h5>
        </div>
    )
};

UserInfo.propTypes = {
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
    repoCount: React.PropTypes.number
};

export default UserInfo;