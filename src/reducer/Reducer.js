export function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {...state, loggedIn: action.payload.value, user: action.payload.user};
        case "authenticating":
            return {...state, isAuthenticating: action.payload.value};
        case "notification":
            return {...state, notifications: action.payload.value, severity: action.payload.severity, notificationOpen: action.payload.open};
        case "loading":
            return {...state, isLoading: action.payload.value}
        default:
            return state;
    }
}