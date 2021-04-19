// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';


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
                    
                </Switch>

            
        </Router>
    );
}

export default App;
