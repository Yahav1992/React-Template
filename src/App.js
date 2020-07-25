import React, {useEffect, useReducer} from "react";
import "./App.css";
import Routes from "./routes/Routes";
import {DispatchContext} from "./libs/dispatchContextLib";
import {StateContext} from "./libs/stateContextLib";
//import "@babel/polyfill"; // convert JSX to different kind of browsers, supports multiple versions.
import 'normalize.css/normalize.css' // resetting css settings in all browsers
import './styles/styles.scss';
import {initialState} from "./reducer/InitState";
import {reducer} from "./reducer/Reducer";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        dispatch({type: "login", payload:{value: Boolean(localStorage.getItem("loggedIn"))}});
        dispatch({type: "authenticating", payload: {value: false}});
    }

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Routes/>
            </DispatchContext.Provider>
        </StateContext.Provider>

    );
}

export default App;