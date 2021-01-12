import React from 'react';

import './dialoguserinfo.css';

function DialogUserInfo({ innerUser }) {
    return (
        <div className="inner-profile-info">
            <h1>{innerUser.name + " " + innerUser.lastName}</h1>
            <div className="status">Online</div>
        </div>
    )
}

export default DialogUserInfo;