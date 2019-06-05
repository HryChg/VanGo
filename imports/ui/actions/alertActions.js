// Reference: https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-actions-js
export const success = (message) => {
    return { 
        type: 'ALERT_SUCCESS',
        payload: message
    }
}

export const error = (message) => {
    return {
        type: 'ALERT_ERROR',
        payload: message
    }
}

export const clear = () => {
    return {
        type: 'ALERT_CLEAR'
    }
}