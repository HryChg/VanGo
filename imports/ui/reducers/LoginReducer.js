import { Meteor } from 'meteor/meteor';

// This function is not yet working...
// Not exactly sure where to call this
function isLoggedIn() {
    Meteor.user() !== null ? true: false;
}

const initialState = { loggedIn: false };

export default function LoginReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_REQUEST':
            console.log("login-request");    
            return { loggedIn: true };
        case 'LOGOUT_REQUEST':
            console.log("logout-request");
            return { loggedIn: false };
        default:
            return state;
    }
}