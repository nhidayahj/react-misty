import React, { useState, useEffect } from 'react';
import config from '../../config'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Button, Alert } from 'reactstrap';

const baseUrl = config.baseUrl;

export default function MemberProfile() {


    const [profile, setProfile] = useState({});
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    // const [custName, setCustName] = useState({
    //     'name': '',
    //     'email': '',
    //     'mobile': ''
    // })

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('customer_id') !== null) {
            setLoggedIn(true);
            setTimeout(() => {
                const fetch = async () => {
                    const customer = await axios.get(baseUrl + '/api/members/profile', {
                        'headers': {
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                        }
                    })
                    console.log(customer.data);
                    setProfile(customer.data);
                }
                fetch();
            }, 1000)

        }
    }, [])

    const goCart = () => {
        history.push(`/profile/cart`)
    }

    const updateProfile = async (e) => {
        try {
            let updateInfo = await axios.post(`${baseUrl}/api/members/info/${e.target.name}/update`, {
                name: profile.name,
                email: profile.email,
                mobile_no: profile.mobile_no
            });
            validUpdate()
        } catch (e) {
            <Alert color="warning">
                <p>Error submitting upate. Please try again. </p>
            </Alert>
        }
    }

    function validUpdate() {
        return (
            <React.Fragment>
                <Alert color="success">
                    <p>Customer details updated</p>
                </Alert>
            </React.Fragment>
        )
    }

    const userLogout = async () => {
        let logout = await axios.post(`${baseUrl}/api/members/logout`, {
            refreshToken: localStorage.getItem('refreshToken')
        })
        localStorage.clear();
        console.log(logout.data.message);
        history.push('/logout');
    }

    const updateName = (e) => {
        let cloned = { ...profile };
        cloned.name = e.target.value;
        setProfile(cloned);
    }

    const updateEmail = (e) => {
        let cloned = { ...profile };
        cloned.email = e.target.value;
        setProfile(cloned);
    }

    const updateMobile = (e) => {
        let cloned = { ...profile };
        cloned.mobile_no = e.target.value;
        setProfile(cloned);
    }

    return <React.Fragment>

        <div className="container profile-box">

            <h3 className="product-headers mt-3">User Account</h3>
            <div className="form-group">
                <label className="form-label-text">Full Name</label>
                <input type="text" className="form-control"
                    name="name" value={profile.name} onChange={updateName} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control"
                    name="email" value={profile.email} onChange={updateEmail} />
            </div>
            <div className="form-group">
                <label>Mobile No.</label>
                <input type="text" className="form-control"
                    name="mobile_no" value={profile.mobile_no} onChange={updateMobile} />
            </div>

            <Button color="info" className="profile-update mt-3"
                onClick={updateProfile} name={localStorage.getItem('customer_id')}>Update Profile</Button>{' '}
            <Button color="success" className="mt-3 profile-cart" onClick={goCart}>Shopping Cart</Button>
        </div>
            <div className="logout-btn mt-3 mb-4">
                <Button color="danger" size="sm" className="profile-logout" onClick={userLogout}>Logout</Button>
            </div>

    </React.Fragment>
}