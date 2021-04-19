import React from 'react';
import { useLocation } from 'react-router-dom'

export default function NewMembers() {

    const location = useLocation();
    const member = location.state.member.fullname

    return <React.Fragment>
        <div className="alert alert-success">
            <p>Welcome {member}! Thank you for registering!</p>
        </div>
    </React.Fragment>
}