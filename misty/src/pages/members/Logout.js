import React from 'react';
import { Alert } from 'reactstrap'

export default function Logout() {
    return (
        <React.Fragment>
            <Alert color="warning">
                You have successfully logged out!
            </Alert>
        </React.Fragment>
    )
}