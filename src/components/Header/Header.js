import {Nav, Navbar, NavItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";
import {useAppContext} from "../../libs/contextLib";

export default function Header() {

    const {isAuthenticated, userHasAuthenticated} = useAppContext();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        userHasAuthenticated(false);
    }

    return (
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to="/">Scratch</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {isAuthenticated
                        ? <NavItem onClick={handleLogout}>Logout</NavItem>
                        : <>
                            <LinkContainer to="/signup">
                                <NavItem>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
