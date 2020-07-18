import React from "react";
import Home from "../components/Home/Home";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from "../components/NotFound/NotFound";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import {useAppContext} from "../libs/contextLib";
import SignUp from "../components/SignUp/SignUp";

export default function Routes() {
    const {isAuthenticating} = useAppContext();
    return (
        !isAuthenticating &&
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route activeClassName="is-active" path="/" component={Home} exact/>
                <Route activeClassName="is-active" path="/login" component={Login} exact/>
                <Route activeClassName="is-active" path="/signup" component={SignUp} exact/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}