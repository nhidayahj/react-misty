import React, { useState, useEffect } from 'react';
import config from '../../config'
import axios from 'axios';

export default function MemberProfile() {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(config.baseUrl + '/api/members/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            setProfile(response.data);

        }
        fetch();
    })
    // const location = useLocation();
    // const member = location.state.member.email

    return <React.Fragment>
        <div className="alert alert-success">
            <p>Welcome back, {profile.name}! </p>
        </div>
        <div className="container">
            <h3>User Profile</h3>
            <ul>
                <li>Name: {profile.name}</li>
                <li>Email: {profile.email}</li>
                <li>DOB: {profile.dob}</li>
            </ul>
        </div>
    </React.Fragment>
}