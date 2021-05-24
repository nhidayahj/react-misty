import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

export default function ErrorLogin() {
  {
    return (
      <React.Fragment>
        <div className="container mt-4">
          <Alert color="danger">
            <p>
              You have entered invalid login credentials. Please try again. Back
              to <Link to="/login">Login Page</Link>
            </p>
          </Alert>
        </div>
      </React.Fragment>
    );
  }
}
