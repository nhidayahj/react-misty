import React from 'react';
import { Alert } from 'reactstrap'

export default function Payment() {
    return (
        <React.Fragment>
            <div className="container mt-4">
                <Alert color="success">
                    <p>Your payment is successful.</p>
                    <p>Thank you for the purchase!</p>
                </Alert>
            </div>
        </React.Fragment>
    )
}