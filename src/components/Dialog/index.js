/* eslint-disable */

import React from 'react';
import settings from '../../settings.json';

import './dialog.css';

import {cutMessage, normalizeTime} from '../../utils';

function Dialog({ info, selectDialog }) {
    return (
        <div className="dialog" onClick={() => selectDialog(info)}>
            <div className="dialog-avatar-block">
                <div className="dialog-avatar">
                    <p>
                        {info.innerUser.name[0].toUpperCase() + info.innerUser.lastName[0].toUpperCase()}
                    </p>
                    {info.innerUser.status ? <div className="online"> </div> : ""}
                </div>
            </div>
            <div className="dialog-message-info">
                <p className="dialog-inner-user">
                    {info.innerUser.name + " " + info.innerUser.lastName}
                </p>
                <p className="dialog-last-message">
                    {info.message ? (info.message.senderId == localStorage.getItem('id')) ? <>
                        <span>You: </span> {cutMessage(info.message.text, settings.dialogMessageLength.short)}</> : cutMessage(info.message.text, settings.dialogMessageLength.normal) : ''}
                </p>
                <p className="dialog-last-message-time">
                    {info.message ? normalizeTime(info.message.time) : ''}
                </p>
            </div>
        </div>
    )
}

export default Dialog;