import React, {useEffect, useState} from "react";
import "./App.css";
import Routes from "./Routes/Routes";
import {AppContext} from "./libs/contextLib";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            //await Auth.currentSession();
            let loggedIn = localStorage.getItem("loggedIn");
            userHasAuthenticated(loggedIn !== null);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <AppContext.Provider value={{isAuthenticated, userHasAuthenticated, isAuthenticating, setIsAuthenticating}}>
            <Routes/>
        </AppContext.Provider>
    );
}

export default App;