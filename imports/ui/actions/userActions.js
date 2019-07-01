import { Meteor } from 'meteor/meteor';

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

export const clearField = () => {
	return {
        type: 'CLEAR_FIELD'
    };
};

// Login
export const login = (email, password) => {
    return async dispatch => {
        dispatch(loginRequest());
        return Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                console.log(err);
                dispatch(loginFailure(err));
            } else {
                dispatch(loginSuccess());
                dispatch(clearField());
                // TODO: Redirect and debug clearField
            }
        });
    }
}

const loginRequest = () => {
	return {
		type: "LOGIN_REQUEST"
	}
}

const loginSuccess = () => {
	return {
		type: "LOGIN_SUCCESS"
	}
}

const loginFailure = (err) => {
	return {
		type: "LOGIN_FAILURE",
		error: { err }
	}
}

// Logout
export const logout = () => {
    return async dispatch => {
        return Meteor.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                dispatch(logoutRequest());
            }
        });
    }
}

const logoutRequest = () => {
    return {
        type: "LOGOUT"
    }
}

// Register
export const createUser = (email, password, name) => {
    return async dispatch => {
        dispatch(registerRequest());
        return Accounts.createUser({email: email, password: password, profile: {name: name}},
            (err) => {
                if (err) {
                    dispatch(registerFailure(err));
                    console.log(err);
                } else {
                    dispatch(registerSuccess());
                    dispatch(clearField());
                    // TODO: Redirect and debug clearField
                }
            })
    };
}

const registerRequest = () => {
	return {
		type: "REGISTER_REQUEST"
	}
}

const registerSuccess = () => {
	return {
		type: "REGISTER_SUCCESS"
	}
}

const registerFailure = (err) => {
	return {
		type: "REGISTER_FAILURE",
		error: { err }
	}
}