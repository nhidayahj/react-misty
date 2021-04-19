import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Register() {
    return (
        <React.Fragment>
            <div class="container">
                <h3>Sign Up!</h3>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control"
                        name="fullname" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        name="email" placeholder="example@mail.com" />
                </div>
            </div>
        </React.Fragment>
    )
}