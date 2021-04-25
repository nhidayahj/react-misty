// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import signin from './icons/signin.png'
import enter from './icons/enter.png'
import misty from './icons/misty.png'
import config from './config';
import axios from 'axios';

// import pages
// import NavbarPage from './commons/navbar'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Register from './pages/members/Register';
import NewMembers from './pages/members/NewMembers';
import Login from './pages/members/Login';
import Profile from './pages/members/Profile';
import Cart from './pages/members/Cart';
import ConfirmOrder from './pages/members/ConfirmOrder';
import Checkout from './pages/members/Checkout';



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
            <div className="header">
                <img src={misty} alt="shop-brand" id="shop-logo"/>
            </div>
        
            <Router>

                <ul className="nav justify-content-center">

                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Who Are We</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contactus">Contact Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Catalog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile/logout">Logout</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile/cart">Cart</Link>
                    </li>

                </ul>
                <Switch>
                    <Route exact path='/about'>
                        <AboutUs />
                    </Route>
                    <Route exact path='/contactus'>
                        <ContactUs />
                    </Route>
                    <Route exact path='/'>
                        <Home />
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

                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
