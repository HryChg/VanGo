import { Meteor } from 'meteor/meteor';
import { batch } from 'react-redux';
import { editingItinerary } from './itineraryActions.js';
import { updateEventDrawer, clearDrawerState } from './draggableItemsActions';
import { loadEventDrawer } from './draggableItemsActions';
import { changeDate } from './datePickerActions';
import { resetMapCenter } from './mapContainerActions';
import { getToday, isString, parseDate } from '../../util/util.js';

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
                // update login success
                // clear login form
                // get event drawer
                // get the date and fetch current events
                batch(() => {
                    dispatch(loginSuccess());
                    dispatch(clearField());
                    dispatch(initializeUser());
                })
            }
        });
    }
}

export const initializeUser = () => {
    return async dispatch => {
        dispatch(resetMapCenter());
        Meteor.call('getEventDrawer', (err, drawer) => {
            if (err) console.log(err);
            batch(()=> {
                dispatch(loadEventDrawer(drawer));
                Meteor.call('getDrawerDate', (err, res) => {
                    let today = getToday();
                    let date = today;
                    let drawerDate = isString(res.date) ? parseDate(res.date) : res.date ;
                    if (drawerDate.getTime() < today.getTime()) {
                        Meteor.call('clearDrawer', today, (err, response) => {
                            if (err) console.log(err);
                        });
                        dispatch(clearDrawerState(today));
                    } else {
                        date = drawerDate;
                    }
                    dispatch(changeDate(date));
                })
            })
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
                dispatch(postLogout());
            }
        });
    }
}

export const postLogout = () => {
    return async dispatch => {
        let today = getToday();
        Meteor.call('clearDrawer', today, (err, res) => {
            if (err) console.log(err);
            batch(() => {
                dispatch(editingItinerary(false));
                dispatch(logoutRequest());
                dispatch(clearDrawerState(today));
                dispatch(changeDate(today));
                dispatch(resetMapCenter());
            })
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