import React, { Component } from 'react';
import settings from '../../settings.json';
import Axios from 'axios';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: null,
            password: null
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleLogin(e) {
        e.preventDefault();
        let result;
        try {
            result = await Axios({
                method: 'POST',
                url: `${settings.serverUrl}login`,
                data: {
                    login: this.state.login,
                    password: this.state.password
                }
            })

            localStorage.setItem('token', result.data.token)
            localStorage.setItem('id', result.data.id)

            await this.props.handleLogin(true, result.data.user)
        } catch (error) {
            await this.props.handleLogin(false, {})
        }
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