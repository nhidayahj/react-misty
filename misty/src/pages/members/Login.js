import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Button } from 'reactstrap'

const baseUrl = config.baseUrl;

export default function Login() {

    const [memberData, setMember] = useState({
        'email': '',
        'password': ''
    });

    const history = useHistory();

    const updateForm = (e) => {
        let cloned = { ...memberData };
        cloned[e.target.name] = e.target.value;
        setMember(cloned);
    }

    const loginUser = async () => {
        const customer = await axios.post(baseUrl + '/api/members/login', {
            'email': memberData.email,
            'password': memberData.password,
        })
        console.log(customer);
        if (customer) {
            localStorage.setItem('accessToken', customer.data.accessToken)
            localStorage.setItem('refreshToken', customer.data.refreshToken)
            localStorage.setItem('customer_id', customer.data.id);
            // window.location = ('/profile')
            history.push('/profile')
        }
        else if (!customer) {
            console.log(customer);
            invalidLogin();
        }
    }


    function invalidLogin() {
        return <React.Fragment>
            <div className="alert alert-danger">
                <p>Incorrect login credentials</p>
            </div>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <div className="container mt-4 mb-4">
                <div className="profile-box register">
                    <h3 className="profile-title">Welcome Back</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"
                            name="email" value={memberData.email} 
                            onChange={updateForm}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"
                            name="password" value={memberData.password} onChange={updateForm} />
                    </div>
                    <button className="btn btn-primary mt-4 login-btn" 
                    onClick={loginUser}>Login</button>
                </div>
            </div>

        </React.Fragment>
    )
}