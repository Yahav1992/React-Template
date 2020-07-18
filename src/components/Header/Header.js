import {NavLink} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../libs/contextLib";

export default function Header() {

    const {isAuthenticated, userHasAuthenticated} = useAppContext();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        userHasAuthenticated(false);
    }

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <NavLink activeClassName="is-active" className="header__title" to="/">Scratch</NavLink>
                    <div className="header__actions">
                        {isAuthenticated
                            ? <NavLink activeClassName="is-active" to="/" onClick={handleLogout}>Logout</NavLink>
                            : <>
                                <NavLink activeClassName="is-active" to="/signup">Signup</NavLink>
                                <NavLink activeClassName="is-active" to="/login">Login</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
