import {NavLink} from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import {useDispatchContext} from "../../libs/dispatchContextLib";
import {useStateContext} from "../../libs/stateContextLib";

export default function Header() {
    const appState = useStateContext();
    const appDispatch = useDispatchContext();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        appDispatch({type: "login", payload: {value: false}});
    }

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <NavLink activeClassName="is-active" className="header__title" to="/">Scratch</NavLink>
                    <div className="header__actions">
                        {appState.loggedIn ?
                            <NavLink activeClassName="is-active" to="/" onClick={handleLogout}>Logout</NavLink>
                            : <Login/>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
