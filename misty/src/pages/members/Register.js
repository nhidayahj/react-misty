import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../config'
import axios from 'axios';

export default function Register() {

    const [memberData, setMember] = useState({
        'fullname': '',
        'email': '',
        'password': '',
        'contact': '',
        'dob':'',

    })
    const history = useHistory();

    const submitRegistration = async () => {
        const response = await axios.post(config.baseUrl + '/api/members/register', {
            name: memberData.fullname,
            email: memberData.email,
            mobile_no: memberData.contact,
            password: memberData.password,
            dob: memberData.dob,
            member_date: new Date()
            
        })
        history.push('/new-member', {
            member:memberData
        })
    }

    const updateForm = (e) => {
        let cloned = { ...memberData };
        cloned[e.target.name] = e.target.value;
        setMember(cloned);
    }

    return (
        <React.Fragment>
            <div class="container">
                <h3>Sign Up!</h3>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control"
                        name="fullname" value={memberData.fullname} onChange={updateForm} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        name="email" placeholder="example@mail.com"
                        value={memberData.email} onChange={updateForm} />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input type="text" className="form-control"
                        name="contact" value={memberData.contact} onChange={updateForm} />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="text" className="form-control"
                        name="dob" placeholder="YYYY-MM-DD"
                        value={memberData.dob} onChange={updateForm} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        name="password" value={memberData.password} onChange={updateForm} />
                </div>
                <div>
                    <button className="btn btn-success btn-sm mt-4" onClick={submitRegistration}>Register</button>
                </div>
            </div>
        </React.Fragment>
    )
}