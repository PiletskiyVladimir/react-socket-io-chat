/* eslint-disable */

import React, { Component } from 'react';
import MessageInput from '../MessageInput';
import MessageOutput from '../MessageOutput';
import EmptyMessageBox from '../EmptyMessageBox';
import DialogUserInfo from '../DialogUserInfo';

import './messageBox.css';

class MessageBox extends Component {
    render() {
        if (this.props.selectedDialog.id) {
            return (
                <div className="chat-message-box">
                    <div className="dialog-selected">
                        <div className="message-box">
                            <DialogUserInfo innerUser={this.props.selectedDialog.innerUser} />
                            <MessageOutput selectedDialog={this.props.selectedDialog.id} />
                        </div>
                        <MessageInput selectedDialog={this.props.selectedDialog.id}/>
                    </div>
                </div>
            )
        } else {
            return (
                <EmptyMessageBox />
            )
        }
    }
}

export default MessageBox;