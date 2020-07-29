import React from "react";
import Home from "../components/Home/Home";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from "../components/NotFound/NotFound";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Notification from '../components/Snackbar/CustomizedSnackbars';
import {useStateContext} from "../libs/stateContextLib";
import ProfilePage from "../components/Profile/ProfilePage";
import GymClasses from "../components/GymClasses/GymClasses";

export default function Routes() {
    const appState = useStateContext();
    const {isAuthenticating, loggedIn, notifications, severity} = appState;

    return (
        !isAuthenticating &&
        <BrowserRouter>
            <Notification messages={notifications} severity={severity}/>
            <Header/>
            <Switch>
                <Route path="/" component={loggedIn ? Home : SignUp} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/signup" component={SignUp} exact/>
                <Route path="/profile" component={ProfilePage} exact/>
                <Route path="/registration" component={GymClasses} exact/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}