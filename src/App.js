/* eslint-disable */

import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import MessageBox from './components/MessageBox';
import AuthComp from './components/AuthComp';
import settings from './settings.json';
import Axios from 'axios';

import socket from './socket';

class App extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.handleLogin = this.handleLogin.bind(this);
		this.selectDialog = this.selectDialog.bind(this);

		this.state = {
			user: {},
			selectedDialog: {},
			logged: false
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (Object.keys(prevState.selectedDialog).length > 0) {
			if (prevState.selectedDialog.id != this.state.selectedDialog.id) {
				socket.emit('roomLeave', {
					user: localStorage.getItem('id'),
					room: prevState.selectedDialog.id
				})
			}
		}
	}

	selectDialog(value) {
		socket.emit('roomJoin', {
			user: localStorage.getItem('id'),
			room: value.id
		});
		this.setState({
			selectedDialog: value
		});
	}

	async handleLogin(value, user) {
		if (value === false) {
			this.setState({
				logged: value,
				user: user,
				selectedDialog: {}
			})
		} else {
			this.setState({
				logged: value,
				user: user
			})
		}
	}

	async componentDidMount() {
		window.addEventListener('beforeunload', (ev) => {
			ev.preventDefault();

			if (localStorage.getItem('id') != null) {
				socket.emit('userStatusChanged', {
					status: 0,
					id: localStorage.getItem('id')
				})
			}
		});
		this._isMounted = true;
		if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
			return this.setState({
				logged: false
			})
		} else {
			try {
				await Axios({
					method: 'POST',
					url: `${settings.serverUrl}check-token`,
					data: {
						token: localStorage.getItem('token')
					}
				})
			} catch (error) {
				return this.setState({
					logged: false
				})
			}

			let user;
			try {
				user = await Axios({
					method: 'GET',
					url: `${settings.serverUrl}${localStorage.getItem('id')}`
				})
			} catch (error) {
				return this.setState({
					logged: false
				})
			}

			return this.setState({
				logged: true,
				user: user.data
			})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className="App">
				<div className="chat-main-block">
					{this.state.logged ?
						<>
							<Sidebar user={this.state.user} handleLogin={this.handleLogin} selectDialog={this.selectDialog} selectedDialog={this.state.selectedDialog.id} />
							<MessageBox selectedDialog={this.state.selectedDialog} />
						</> : <AuthComp handleLogin={this.handleLogin} />
					}
				</div>
			</div>
		)
	}
}

export default App;