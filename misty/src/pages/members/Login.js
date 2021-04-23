import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Button } from 'reactstrap'

const baseUrl = config.baseUrl;

export default function Login2() {

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
        if (customer.status === 200) {
            console.log(customer);
            localStorage.setItem('accessToken', customer.data.accessToken)
            localStorage.setItem('refreshToken', customer.data.refreshToken)
            localStorage.setItem('customer_id', customer.data.id);
            // window.location = ('/profile')
            history.push('/profile')
        } 

    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        name="email" value={memberData.email} onChange={updateForm} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        name="password" value={memberData.password} onChange={updateForm} />
                </div>
                <Button class="btn btn-primary mt-4" onClick={loginUser}>Login</Button>
            </div>

        </React.Fragment>
    )
}