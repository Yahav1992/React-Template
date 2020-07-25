import {NavLink} from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import {useStateContext} from "../../libs/stateContextLib";
import SignedHeader from "./SignedHeader";

export default function Header() {
    const appState = useStateContext();

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <NavLink activeClassName="is-active" className="header__title" to="/">Scratch</NavLink>
                    <div className="header__actions">
                        {appState.loggedIn ? <SignedHeader/> : <Login/>}
                    </div>
                </div>
            </div>
        </header>
    );
}
