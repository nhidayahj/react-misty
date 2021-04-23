import React, { useState, useEffect } from 'react';
import config from '../../config'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import { Button } from 'reactstrap';

const baseUrl = config.baseUrl;

export default function MemberProfile() {

    const location = useLocation();
    // const customer=location.state.name;
    // const email=location.state.email;
    // const customer_id=location.state.id


    const [profile, setProfile] = useState({});
    const [isLoggedIn, setLoggedIn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetch = async () => {
            const customer = await axios.get(baseUrl + '/api/members/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // const customerName=location.state.name;
            // const email=location.state.email;
            // const customer_id=location.state.id
            setProfile(customer.data);
        }
        fetch();
        console.log(profile)
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (localStorage.getItem('customer_id') !== null) {
                setLoggedIn(true);
            }
            else {
                history.push('/login')
            }
        }
        fetch()
    }, [])

    const goCart = () => {
        history.push(`/profile/cart`)
    }

    return <React.Fragment>
        <div className="alert alert-success">
            <p>Welcome back, {}! </p>
        </div>
        <div className="container">
            <h3>User Profile</h3>
            <ul>
                <li>Name: {profile.name}</li>
                <li>Email: {profile.email}</li>
            </ul>
            <Button color="success" className="mt-3" onClick={goCart}>Shopping Bag</Button>
        </div>
        <div>
            <Button color="danger" size="sm" className="mt-3">Logout</Button>
        </div>
    </React.Fragment>
}