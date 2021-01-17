import React, { Component } from 'react';
import settings from '../../settings.json';
import Axios from 'axios';

// import socket from '../../socket';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: null,
            password: null
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleLogin(e) {
        e.preventDefault();
        if (!this.state.login || !this.state.password) {
            alert('Input values!!!');
            return this.setState({
                login: null,
                password: null
            })
        }
        let result;
        try {
            result = await Axios({
                method: 'POST',
                url: `${settings.serverUrl}login`,
                data: {
                    login: this.state.login,
                    password: this.state.password
                }
            });
        } catch (err) {
            return await this.props.handleLogin(false, {})
        }

        localStorage.setItem('token', result.data.token);
        localStorage.setItem('id', result.data.id);

        return await this.props.handleLogin(true, result.data.user)
    }

    async handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form>
                <input type="text" className="auth-comp-input" placeholder="Input your login" name="login" onChange={this.handleChange} />
                <input type="password" className="auth-comp-input" placeholder="Input your password" name="password" onChange={this.handleChange} />
                <button onClick={this.handleLogin}>Login</button>
                <p>Click <span onClick={() => this.props.handleClick('Register')}>here</span> to register</p>
            </form>
        )
    }
}

export default Login;