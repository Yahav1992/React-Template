import {INFO} from "../constants/Constants";

export const initialState = {
    loggedIn: Boolean(localStorage.getItem("loggedIn")),
    user: {
        token: localStorage.getItem("token"),
        userName: localStorage.getItem("userName"),
    },

    notifications: "",
    notificationOpen: false,
    severity: INFO,

    isAuthenticating: false,
    isLoading: false,

}