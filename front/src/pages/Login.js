import React, { Component } from 'react'

import logoTwitter from '../twitter.svg'
import './Login.css'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit = event => {
        const { username } = this.state

        if (!username.length) {
            return
        }

        localStorage.setItem("@GoTwitter:username", username)

        this.props.history.push("/timeline")
    }

    handleInputChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={logoTwitter} alt="Twitter logo" />
                <form onSubmit={this.handleSubmit}>
                    <input
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder="Nome de usuário" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}

export default Login
