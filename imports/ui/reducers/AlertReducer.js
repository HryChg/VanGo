// Reference: https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-actions-js
export default function AlertReducer(state = {}, action) {
    switch(action.type) {
        case 'ALERT_SUCCESS':
            return {
                type: 'alert-success',
                message: action.message
            }
        case 'ALERT_ERROR':
            return {
                type: 'alert-danger',
                message: action.message
            }
        case 'ALERT_CLEAR':
            return {};
        default:
            return state;
    }
}