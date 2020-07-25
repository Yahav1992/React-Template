import React, {useEffect, useState} from "react";
import "./App.css";
import Routes from "./routes/Routes";
import {AppContext} from "./libs/contextLib";
//import "@babel/polyfill"; // convert JSX to different kind of browsers, supports multiple versions.
import 'normalize.css/normalize.css' // resetting css settings in all browsers
import './styles/styles.scss';
import {INFO} from "./constants/Constants";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [severity, setSeverity] = useState(INFO);
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    function addNotificationMessage(msg, severity) {
        setNotifications(msg);
        setSeverity(severity);
        setNotificationOpen(true);
    }

    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        try {
            let loggedInLS = localStorage.getItem("loggedIn");
            setLoggedIn(loggedInLS !== null);
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <AppContext.Provider value={{
            loggedIn,
            setLoggedIn,
            isAuthenticating,
            setIsAuthenticating,
            notifications,
            setNotifications,
            addNotificationMessage,
            notificationOpen,
            setNotificationOpen,
            severity
        }}>
            <Routes/>
        </AppContext.Provider>
    );
}

export default App;