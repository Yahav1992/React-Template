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
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/signup" component={SignUp} exact/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}