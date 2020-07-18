import React, {useEffect, useState} from "react";
import "./App.css";
import Routes from "./Routes/Routes";
import {AppContext} from "./libs/contextLib";
import {getAllUsers} from "./api/springRestApi";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [userList, setUserList] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            getAllUsers().then(r => setUserList(r.data))
            let loggedIn = localStorage.getItem("loggedIn");
            userHasAuthenticated(loggedIn !== null);
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
            isAuthenticated,
            userHasAuthenticated,
            isAuthenticating,
            setIsAuthenticating,
            userList,
            setUserList
        }}>
            <Routes/>
        </AppContext.Provider>
    );
}

export default App;