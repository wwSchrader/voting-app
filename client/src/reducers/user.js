export function userIsSignedIn(state = false, action) {
    console.log(action);
    switch (action.type) {
        case 'USER_IS_LOGGED_IN':
            return action.isLoggedIn;
        default:
            return state;
    }
}