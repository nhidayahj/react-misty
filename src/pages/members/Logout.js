import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap'
import axios from 'axios';
import config from '../../config';
import navbar from '../../commons/navbar'


const baseUrl = config.baseUrl;

export default function Logout() {

    useEffect(() => {
        const fetch = async () => {
            let logout = await axios.post(`${baseUrl}/api/members/logout`, {
                refreshToken: localStorage.getItem('refreshToken')
            })
            localStorage.clear();
            console.log(logout.data.message);
            <navbar/>
        }
        fetch();
    }, [])
 
    return (
        <React.Fragment>
            <div className="container">
                <Alert color="warning">
                    <p>You have successfully logged out!</p>
                    <p>We hope to see you again!</p>
                </Alert>
            </div>
        </React.Fragment>
    )
}