import React from 'react';
import { Alert } from 'reactstrap'

export default function ErrorLogin() {
    {
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <Alert color="danger">
                        <p>You have entered invalid login credentials. Please try again.</p>
                </Alert>
                </div>
            </React.Fragment>
        )
    } 
}