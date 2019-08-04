import { Meteor } from 'meteor/meteor';
import { batch } from 'react-redux';
import { changeDate } from './datePickerActions.js';
import { editingItinerary } from './itineraryActions.js';

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

// Set or reset pages
export const setLoginState = (state) => {
    return {
        type: 'SET_LOGIN_STATE',
        payload: state
    };
};

export const resetRegisterPage = () => {
    return {
        type: 'RESET_REGISTER_PAGE'
    }
}

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
		payload: { err }
	}
}

// Logout
export const logout = () => {
    return async dispatch => {
        return Meteor.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                batch(() => {
                    dispatch(editingItinerary(false));
                    dispatch(changeDate(new Date()));
                    dispatch(logoutRequest());
                })
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
        return Meteor.call('createUserWithCheck', {email: email, password: password, profile: {name: name}},
            (err) => {
                if (err) {
                    dispatch(registerFailure(err));
                    console.log(err);
                } else {
                    dispatch(registerSuccess());
                    dispatch(clearField());
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
		payload: err
	}
}