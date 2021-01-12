/* eslint-disable */

import React, { Component } from 'react';
import Dialog from '../Dialog';
import Axios from 'axios';
import settings from '../../settings.json';

import socket from '../../socket';

import './dialogs.css';

class Dialogs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogs: []
        }
    }

    async componentDidMount() {
        socket.on('messageReceived', (data) => {
            let dialogs = this.state.dialogs;
            for (let i = 0; i < dialogs.length; i++) {
                if (dialogs[i].id == data.dialogId) {
                    
                    dialogs[i].message = data;

                    this.setState({
                        dialogs: dialogs
                    })
                }
            }
        })
        let dialogs;

        try {
            dialogs = await Axios({
                method: "GET",
                url: `${settings.serverUrl}${localStorage.getItem('id')}/dialogs`
            })
        } catch (error) {
            throw error;
        }

        this.setState({
            dialogs: dialogs.data
        })
    }

    render() {
        return (
            <div className="sidebar-dialogs-block">
                {
                    this.state.dialogs ? this.state.dialogs.map(dialog =>
                        <Dialog info={dialog} user={this.props.user} key={dialog.id} selectDialog={this.props.selectDialog} />
                    ) : ""
                }
            </div>
        )
    }
}

export default Dialogs;