import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {Link} from 'react-router-dom';

import signin from '../icons/signin.png'
import user from '../icons/user.png'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [loggedIn, setLoggedIn] = useState(false);
  const [customer, setCustomer] = useState(false);

  useEffect(() => {
    let customer = localStorage.getItem('customer_id');
    setLoggedIn(true);
    setCustomer(customer);
  },[loggedIn])

  if (customer && loggedIn===true) {
      
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Misty</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                <Link to="/about">
                  <NavLink>Who Are We</NavLink>
                  </Link>
                </NavItem>
                <Link to="/contact">
                <NavItem>
                  <NavLink>Contact Us</NavLink>
                </NavItem>
                </Link>
                
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Catalog
                  </DropdownToggle>
                  <DropdownMenu right>
                      <Link to="/diffusers">
                    <DropdownItem>
                      Diffusers
                    </DropdownItem>
                        </Link>
                    
                    <Link to="/oils"><DropdownItem>
                      Essential Oils 
                    </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="ml">
                  <NavbarText>Welcome</NavbarText>
                  <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    <span><img src={user} alt="signin-icon" width="25px" height="25px"/>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/profile">
                        <DropdownItem>
                        Account
                        </DropdownItem>
                    </Link>
                    <Link to="/profile/cart">
                    <DropdownItem>
                      Cart
                    </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/logout">
                    <DropdownItem>
                      Logout
                    </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
                
              </Nav>
    
              
            </Collapse>
          </Navbar>
        </div>
      );
  } else {
      return (
          <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Misty</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <Link to="/about">
                <NavItem>
                  <NavLink>Who Are We</NavLink>
                </NavItem>
                </Link>
                <Link to="/contact">
                <NavItem>
                  <NavLink>Contact Us</NavLink>
                </NavItem>
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Catalog
                  </DropdownToggle>
                  <DropdownMenu right>
                      <Link to="/diffusers">
                    <DropdownItem>
                      Diffusers
                    </DropdownItem>
                    </Link>
                    <Link to="/oils">
                    <DropdownItem>
                      Essential Oils 
                    </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="ml">
                  <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    <span><img src={signin} alt="signin-icon" width="25px" height="25px"/>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/signup">
                    <DropdownItem>
                      Join Us
                    </DropdownItem>
                    </Link>
                    <Link to="/membership">
                    <DropdownItem>
                      Membership
                    </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/login">
                    <DropdownItem>
                      Log In
                    </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
      
  }

}

export default NavBar;