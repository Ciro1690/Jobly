import React, {useContext} from 'react';
import '../../styles/NavBar.css'
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';

const NavBar = () => {

    const value = useContext(currentUser);

    return (
            <Navbar expand="lg border">
            <NavLink exact tag={Link} to="/" className="navbar-brand">
                    Jobly
                </NavLink>
                {currentUser ? 
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/jobs">Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/logout">Logout</NavLink>
                        </NavItem> 
                    </Nav> :
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/signup">Signup</NavLink>
                        </NavItem>
                    </Nav>
                    }
            </Navbar>
    );
}

export default NavBar