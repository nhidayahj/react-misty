import React  from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'

const baseUrl = 'https://3001-emerald-herring-pjfc5f72.ws-us03.gitpod.io'

export default class Login extends React.Component {
    state={
        'email':'',
        'password':'',
        'invalid':true
    }

    loginForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = async() => {
        if (this.state.email === '' || this.state.password === '') {
            this.invalidAlert();
        }
        if (this.state.email !== '' && this.state.password !== '' ) {
            let submitLogin = await axios.post(baseUrl + '/api/members/login', {
                email:this.state.email,
                password:this.state.password
            })
            if(submitLogin.status === 200) {
                console.log(submitLogin);
                localStorage.setItem('accessToken',submitLogin.data.accessToken)
                localStorage.setItem('refreshToken',submitLogin.data.refreshToken)
                window.location = `/profile`
            } else {
                console.log(submitLogin.status)
                this.invalidAlert();
            }
        }
    }

    invalidAlert = () => {
        return alert("Login details are incorrect.")
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">

                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"
                            name="email" value={this.state.email} onChange={this.loginForm} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"
                            name="password" value={this.state.password} onChange={this.loginForm} />
                    </div>
                    <button className="btn btn-success btn-sm mt-4" 
                    onClick={this.submitForm}>Login</button>

                </div>
            </React.Fragment>
        )
    }

}