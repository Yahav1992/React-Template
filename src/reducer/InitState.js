import {INFO} from "../constants/Constants";

export const initialState = {
    loggedIn: Boolean(localStorage.getItem("loggedIn")),
    notifications: "",
    notificationOpen: false,
    isAuthenticating: false,
    severity: INFO,
    isLoading: false,

}