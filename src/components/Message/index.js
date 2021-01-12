/* eslint-disable */

import React from 'react';

import { returnTimeObj } from '../../utils';

import './message.css'

function Message({ message }) {
    let time = returnTimeObj(message.time);

    return (
        <>
            {
                (message.senderId == localStorage.getItem('id')) ? <div className="my-message">
                    <p className="message">{message.text}</p>
                    <p className="message-time">{time.hours + ":" + time.minutes}</p>
                </div> : <div className="inner-message">
                        <p className="message">{message.text}</p>
                        <p className="message-time">{time.hours + ":" + time.minutes}</p>
                    </div>
            }
        </>
    )
}

export default Message;