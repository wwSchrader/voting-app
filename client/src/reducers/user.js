export function userIsSignedIn(state = false, action) {
    switch (action.type) {
        case 'USER_IS_LOGGED_IN':
            return action.isLoggedIn;
        default:
            return state;
    }
}

export function userIdNumber(state = null, action) {
    switch (action.type) {
        case 'USER_ID_FETCH_SUCCESSFUL':
            return action.userId;
        default:
            return state;
    }
}