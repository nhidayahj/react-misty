import React, { useState, useEffect } from 'react';
import config from '../../config'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Button } from 'reactstrap';

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
            }, 500)

        }
    }, [])

    const goCart = () => {
        history.push(`/profile/cart`)
    }

    const updateProfile = async (e) => {
        let updateInfo = await axios.post(`${baseUrl}/api/members/info/${e.target.name}/update`, {
            name:profile.name,
            email:profile.email,
            mobile_no:profile.mobile_no
        });
        if (updateInfo.status === 200) {
            console.log(updateInfo)
        }
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
        
        <div className="container">
            <h3>User Profile</h3>
            <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control"
                    name="name" value={profile.name} onChange={updateName}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control"
                    name="email" value={profile.email}  onChange={updateEmail}/>
            </div>
            <div className="form-group">
                <label>Mobile No.</label>
                <input type="text" className="form-control"
                    name="mobile_no" value={profile.mobile_no}  onChange={updateMobile}/>
            </div>
            <Button color="info" className="mt-3" 
            onClick={updateProfile} name={localStorage.getItem('customer_id')}>Update Profile</Button>{' '}
            <Button color="success" className="mt-3" onClick={goCart}>Shopping Cart</Button>

        </div>
        <Button color="danger" size="sm" className="mt-3">Logout</Button>

    </React.Fragment>
}