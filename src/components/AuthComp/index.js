import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';

import './authcomp.css';

class AuthComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            display: 'Login'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        this.setState({
            display: value
        })
    }

    render() {
        let display = this.state.display;
        return (
            <div className="auth-comp">
                {
                    {
                        'Login': <Login handleClick={this.handleClick} handleLogin={this.props.handleLogin}/>,
                        'Register': <Register handleClick={this.handleClick} handleLogin={this.props.handleLogin}/>
                    }[display]
                }
            </div>
        )
    }
}

export default AuthComp;