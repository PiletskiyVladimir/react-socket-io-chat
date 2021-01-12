/* eslint-disable */

import React from 'react';

import './dialog.css';

import { normalizeTime, cutMessage } from '../../utils';

function Dialog({ info, selectDialog }) {
    return (
        <div className="dialog" onClick={() => selectDialog(info)}>
            <div className="dialog-avatar-block">
                <div className="dialog-avatar">
                    <p>
                        {info.innerUser.name[0].toUpperCase() + info.innerUser.lastName[0].toUpperCase()}
                    </p>
                </div>
            </div>
            <div className="dialog-message-info">
                <p className="dialog-inner-user">
                    {info.innerUser.name + " " + info.innerUser.lastName}
                </p>
                <p className="dialog-last-message">
                    {info.message ? (info.message.senderId == localStorage.getItem('id')) ? <><span>You: </span> {cutMessage(info.message.text, 17)}</> : cutMessage(info.message.text, 22) : ''}
                </p>
                <p className="dialog-last-message-time">
                    {info.message ? normalizeTime(info.message.time) : ''}
                </p>
            </div>
        </div>
    )
}

export default Dialog;