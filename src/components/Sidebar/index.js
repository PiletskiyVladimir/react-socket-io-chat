import React from 'react';
import UserInfo from '../UserInfo';
import Dialogs from '../Dialogs'
import './sidebar.css';

function Sidebar({ user, handleLogin, selectDialog }) {
    return (
        <div className="sidebar">
            <UserInfo user={user} handleLogin={handleLogin} />
            <Dialogs user={user} selectDialog={selectDialog} />
        </div>
    )
}

export default Sidebar;