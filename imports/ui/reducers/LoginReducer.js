import { Meteor } from 'meteor/meteor'

const initialState = { loggedIn: Meteor.user() !== null ? true: false };

export default function LoginReducer(state = initialState, action) {
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
            return state;
    }
}