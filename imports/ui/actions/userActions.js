// Field updates
export const updateLoginField = (event) => {
    return {
        type: 'UPDATE_LOGIN_FIELD',
        payload: event.target
    }
}

export const updateRegisterField = (event) => {
    return {
        type: 'UPDATE_REGISTER_FIELD',
        payload: event.target
    }
}

export const login = () => {
	return {
        type: 'LOGIN_REQUEST'
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT_REQUEST'
    };
};
