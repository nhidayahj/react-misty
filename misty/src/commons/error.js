import React from 'react';
import { Alert } from 'reactstrap'

export default function Error(props) {

    {
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <Alert color="danger">
                        <p>Customer already exists! Please log in instead.</p>
                </Alert>
                </div>
            </React.Fragment>
        )
    } 
    // else if (props == 'invalid') {
    //     return (
    //         <React.Fragment>
    //             <div className="container mt-4">
    //                 <Alert color="danger">
    //                     <p>You have entered invalid login credentials. Please try again.</p>
    //             </Alert>
    //             </div>
    //         </React.Fragment>
    //     )
    // }
}