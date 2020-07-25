import {NavLink} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../libs/contextLib";
import Login from "../Login/Login";

export default function Header() {

    const {loggedIn, setLoggedIn} = useAppContext();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        setLoggedIn(false);
    }

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <NavLink activeClassName="is-active" className="header__title" to="/">Scratch</NavLink>
                    <div className="header__actions">
                        {loggedIn
                            ? <NavLink activeClassName="is-active" to="/" onClick={handleLogout}>Logout</NavLink>
                            : <Login/>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
