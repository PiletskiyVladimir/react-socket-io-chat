import React, { Component } from 'react';
import settings from '../../settings.json';
import Axios from 'axios';

import './register.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "test",
            name: "test",
            lastName: "test",
            password: "test"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        // let response;
        try {
            // response = await Axios.post(`${settings.serverUrl}register`, {
            await Axios({
                method: 'POST',
                url: `${settings.serverUrl}register`,
                data: {
                    login: this.state.login,
                    password: this.state.password,
                    name: this.state.name,
                    lastName: this.state.lastName
                }
            })

            this.props.handleClick('Login');
        } catch (error) {
            this.props.handleClick('Register');
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
                <input type="text" className="auth-comp-input" placeholder="Input your name" name="name" onChange={this.handleChange} />
                <input type="text" className="auth-comp-input" placeholder="Input your lastName" name="lastName" onChange={this.handleChange} />
                <input type="password" className="auth-comp-input" placeholder="Input your password" name="password" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Register</button>
                <p>Click <span onClick={() => this.props.handleClick('Login')}>here </span> to login</p>
            </form>
        )
    }
}

export default Register;