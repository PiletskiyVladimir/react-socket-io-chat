import React from 'react';

import './dialoguserinfo.css';

function DialogUserInfo({ innerUser }) {
    return (
        <div className="inner-profile-info">
            <h1>{innerUser.name + " " + innerUser.lastName}</h1>
            <div className="status">{innerUser.status ? "Online" : "Offline"}</div>
        </div>
    )
}

export default DialogUserInfo;