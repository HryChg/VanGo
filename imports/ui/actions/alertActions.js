// For Registration
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