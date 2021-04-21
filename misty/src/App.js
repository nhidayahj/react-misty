// import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Register from './pages/members/Register';
import NewMembers from './pages/members/NewMembers';
import Login from './pages/members/Login';
import Profile from './pages/members/Profile';
import Cart from './pages/members/Cart';
import ConfirmOrder from './pages/members/ConfirmOrder';


function App() {
    return (
        <Router>
            
                {/* <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Misty</Link>
                </div> */}
                <ul className="nav justify-content-center">
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
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
                </ul>
                <Switch>
                    <Route exact path='/about'>
                        <AboutUs/>
                    </Route>
                    <Route exact path='/contactus'>
                        <ContactUs/>
                    </Route>
                    <Route exact path='/'>
                        <Home/>
                    </Route>
                    <Route exact path='/signup'>
                        <Register/>
                    </Route>
                    <Route exact path='/new-member'>
                        <NewMembers/>
                    </Route>
                    <Route exact path='/login'>
                        <Login/>
                    </Route>
                    <Route exact path='/profile'>
                        <Profile/>
                    </Route>
                    <Route exact path='/profile/:customer_id'>
                        <Cart/>
                    </Route>
                    <Route exact path='/profile/:customer_id/confirm'>
                        <ConfirmOrder/>
                    </Route>
                    
                </Switch>

            
        </Router>
    );
}

export default App;