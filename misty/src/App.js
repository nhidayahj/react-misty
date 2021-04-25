// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import misty from './icons/misty.png'
import config from './config';
import axios from 'axios';

// import pages
import Diffusers from './pages/products/Diffusers';
import Oils from './pages/products/Oils';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Register from './pages/members/Register';
import NewMembers from './pages/members/NewMembers';
import Login from './pages/members/Login';
import Logout from './pages/members/Logout';
import Profile from './pages/members/Profile';
import Cart from './pages/members/Cart';
import ConfirmOrder from './pages/members/ConfirmOrder';
import Checkout from './pages/members/Checkout';
import NavBar from './commons/navbar'
import Error from './commons/error'
import ErrorLogin from './commons/error-login'



function App() {
    useEffect(() => {
        setInterval(async () => {
            const response = await axios.post(
                config.baseUrl + "/api/members/refresh",
                {
                    refreshToken: localStorage.getItem("refreshToken")
                }
            );
            localStorage.setItem("accessToken", response.data.accessToken);
        }, config.REFRESH_TOKEN_INTERVAL);
    });
    return (
        <React.Fragment>
            <Router>
                <NavBar />
                    <div className="header">
                        <img src={misty} alt="shop-brand" id="shop-logo" />
                    </div>
                <Switch>
                    <Route exact path='/about'>
                        <AboutUs />
                    </Route>
                    <Route exact path='/contact'>
                        <ContactUs />
                    </Route>
                    <Route exact path='/diffusers'>
                        <Diffusers />
                    </Route>
                    <Route exact path='/oils'>
                        <Oils />
                    </Route>
                    <Route exact path='/signup'>
                        <Register />
                    </Route>
                    <Route exact path='/new-member'>
                        <NewMembers />
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/profile'>
                        <Profile />
                    </Route>
                    <Route exact path='/profile/cart'>
                        <Cart />
                    </Route>
                    <Route exact path='/shipping'>
                        <ConfirmOrder />
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout />
                    </Route>
                    <Route exact path='/logout'>
                        <Logout />
                    </Route>
                    <Route exact path='/error'>
                        <Error />
                    </Route>
                    <Route exact path='/error-login'>
                        <ErrorLogin />
                    </Route>

                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
