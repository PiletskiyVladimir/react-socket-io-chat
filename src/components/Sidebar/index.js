import React from 'react';
import UserInfo from '../UserInfo';
import Dialogs from '../Dialogs'
import './sidebar.css';

function Sidebar({ user, handleLogin, selectDialog, selectedDialog }) {
    return (
        <div className="sidebar">
            <UserInfo user={user} handleLogin={handleLogin} />
            <Dialogs user={user} selectDialog={selectDialog} selectedDialog={selectedDialog} />
        </div>
    )
}

export default Sidebar;