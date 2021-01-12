import React, { Component } from 'react';

import socket from '../../socket';

import './messageinput.css';

class MessageInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.message.length);
        if (this.state.message.length > 0) {
            socket.emit('sendMessage', {
                user: localStorage.getItem('id'),
                room: this.props.selectedDialog,
                message: this.state.message
            })

            this.setState({
                message: ""
            })
        }
    }

    render() {
        return (
            <div className="message-input-box">
                <input type="text" className="message-input" placeholder="Input message text" value={this.state.message} onChange={this.handleChange} onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        if (this.state.message.length > 0) {
                            socket.emit('sendMessage', {
                                user: localStorage.getItem('id'),
                                room: this.props.selectedDialog,
                                message: this.state.message
                            })

                            this.setState({
                                message: ""
                            })
                        }
                    }
                }} />
                <button className="send-message-btn" onClick={this.handleSubmit} >Send</button>
            </div>
        )
    }
}

export default MessageInput;