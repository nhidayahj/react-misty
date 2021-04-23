import React from 'react';
import { useLocation, Link } from 'react-router-dom'

export default function NewMembers() {

    const location = useLocation();
    const member = location.state.member.fullname

    return <React.Fragment>
        <div className="alert alert-success">
            <p>Welcome {member}! Thank you for registering!</p>
        </div>
        <div className="container">
            <Link to="/">Browse our catalog!</Link>
        </div>
    </React.Fragment>
}