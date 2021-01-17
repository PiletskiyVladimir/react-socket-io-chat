/* eslint-disable */

import React, {Component} from 'react';
import Dialog from '../Dialog';
import Axios from 'axios';
import settings from '../../settings.json';

import socket from '../../socket';

import moment from 'moment';

import './dialogs.css';

class Dialogs extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            dialogs: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        socket.on('messageReceived', (data) => {
            let dialogs = this.state.dialogs;
            for (let i = 0; i < dialogs.length; i++) {
                if (dialogs[i].id === data.dialogId) {

                    dialogs[i].message = data;

                    dialogs.sort((a, b) => {
                        return moment(b.message.time).valueOf() - moment(a.message.time).valueOf();
                    });

                    this.setState({
                        dialogs: dialogs
                    });

                    break;
                }
            }
        });

        socket.on('otherUserStatusChanged', (data) => {
            let dialogs = this.state.dialogs;
            for(let i = 0; i < dialogs.length; i++) {
                if (dialogs[i].innerUser.id == +data.id) {
                    dialogs[i].innerUser.status = data.status;

                    dialogs.sort((a, b) => {
                        return moment(b.message.time).valueOf() - moment(a.message.time).valueOf();
                    });

                    this.setState({
                        dialogs: dialogs
                    });

                    break;
                }
            }
        });

        socket.on('emitToNotSelectedDialog', (data) => {
            if (this.props.selectedDialog != data.dialogId) {
                let dialogs = this.state.dialogs;
                for (let i = 0; i < dialogs.length; i++) {
                    if (dialogs[i].id == data.dialogId) {

                        dialogs[i].message = data;

                        dialogs.sort((a, b) => {
                            return moment(b.message.time).valueOf() - moment(a.message.time).valueOf();
                        });

                        this.setState({
                            dialogs: dialogs
                        });

                        break;
                    }
                }
            }
        });

        socket.on('userRegistered', (data) => {
            data.forEach(el => {
                if (el.innerUser.id == localStorage.getItem('id')) {
                    let dialogs = this.state.dialogs;

                    dialogs.push({
                        id: el.id,
                        innerUser: el.user,
                        message: el.message
                    });

                    dialogs.sort((a, b) => {
                        return moment(b.message.time).valueOf() - moment(a.message.time).valueOf();
                    });

                    this.setState({
                        dialogs: dialogs
                    })
                }
            })

        });

        let dialogs;

        try {
            dialogs = await Axios({
                method: "GET",
                url: `${settings.serverUrl}${localStorage.getItem('id')}/dialogs`
            })
        } catch (error) {
            throw error;
        }

        dialogs.data.sort((a, b) => {
            return moment(b.message.time).valueOf() - moment(a.message.time).valueOf();
        });

        this.setState({
            dialogs: dialogs.data
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="sidebar-dialogs-block">
                {
                    this.state.dialogs ? this.state.dialogs.map(dialog =>
                        <Dialog info={dialog} user={this.props.user} key={dialog.id}
                                selectDialog={this.props.selectDialog}/>
                    ) : ""
                }
            </div>
        )
    }
}

export default Dialogs;