/* eslint-disable */

import React, { Component } from 'react';
import Message from '../Message';
import EmptyPage from '../EmptyPage';

import settings from '../../settings.json';

import socket from '../../socket';

import Axios from 'axios';

import './messageOutput.css';

class MessageOutput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    scrollToBottom = (behaviour) => {
        this.messagesEnd.scrollIntoView({ behavior: behaviour });
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedDialog != this.props.selectedDialog) {
            if (this.props.selectedDialog) {
                let messages = await Axios({
                    url: `${settings.serverUrl}${this.props.selectedDialog}/messages`
                });
    
                return this.setState({
                    messages: messages.data.messages
                })
            }    
        }

        if (this.state.messages.length > 0) {
            this.scrollToBottom("auto");
        }
    }

    async componentDidMount() {
        socket.on('messageReceived', (data) => {
            let array = this.state.messages;

            array.push(data);

            this.setState({
                messages: array
            })
        });
        if (this.props.selectedDialog) {
            let messages = await Axios({
                url: `${settings.serverUrl}${this.props.selectedDialog}/messages`
            });

            return this.setState({
                messages: messages.data.messages
            })
        }

        if (this.state.messages.length > 0) {
            this.scrollToBottom("auto");
        }
    }

    render() {
        if (this.state.messages == null || this.state.messages.length == 0) {
            return (
                <EmptyPage />
            )
        } else {
            return (
                <div className="messages-block">
                    {
                        this.state.messages.map(message =>
                            <Message message={message} key={message.id} />
                        )
                    }
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
            )
        }
    }
}

export default MessageOutput;