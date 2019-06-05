const initialState = { email: "", password: "" };

// TODO: Figure out where "localStorage.getItem is from"
let user = JSON.parse(localStorage.getItem('user'));
const intialState = user ? { loggedIn: true, user} : {};

export default function LoginReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            }
        case 'LOGIN_SUCCESS':
            return {
                loggedIn: true,
                user: action.user
            }
        case 'LOGIN_FAILURE':
            return {};
        case 'LOGOUT':
            return {};
        default:
            return {};
    }
}