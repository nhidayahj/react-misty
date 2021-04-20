import React, { useState, useEffect } from 'react';
import config from '../../config'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import {Button} from 'reactstrap';

export default function MemberProfile() {

    const location = useLocation();
    const customer=location.state.name;
    const email=location.state.email;
    const customer_id=location.state.id
    

    const [profile, setProfile] = useState({});
    
    const history = useHistory();

    useEffect(() => {
        const fetch = async () => {
            const customer = await axios.get(config.baseUrl + '/api/members/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            setProfile(customer.data);
        }
        fetch();
        console.log(profile)
    },[profile])
    
    const goCart= () => {
        history.push(`/profile/${customer_id}`, {
            id:customer_id
        })
    }

    return <React.Fragment>
        <div className="alert alert-success">
            <p>Welcome back, {customer}! </p>
        </div>
        <div className="container">
            <h3>User Profile</h3>
            <ul>
                <li>Name: {customer}</li>
                <li>Email: {email}</li>
            </ul>
            <Button className="btn btn-secondary mt-3" onClick={goCart}>Shopping Bag</Button>
        </div>
    </React.Fragment>
}