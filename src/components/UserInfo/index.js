import React from 'react';

import './userinfo.css';

function UserInfo({ user, handleLogin }) {
    return (
        <div className="sidebar-profile-info">
            <div className="profile-avatar-cont">
                <div className="profile-avatar">
                    <p>
                        {user.name[0].toUpperCase() + user.lastName[0].toUpperCase()}
                    </p>
                </div>
            </div>
            <div className="profile-info">
                <p>{user.name + " " + user.login + " " + user.lastName}</p>
                <p>{"ID: " + localStorage.getItem('id')}</p>
                <p className="on-exit" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    handleLogin(false, {})
                }}>Exit</p>
            </div>
        </div>
    )
}

export default UserInfo;