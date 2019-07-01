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

export const login = (email, password) => {
    return async () => {
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                console.log(err);
            } else {
                clearField();
                // TODO: Redirect and debug clearField
            }
        });
    }
}

export const createUser = (email, password, name) => {
    return async () => {
        Accounts.createUser({email: email, password: password, profile: {name: name}},
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    clearField();
                    // TODO: Redirect and debug clearField
                }
            })
    };
}