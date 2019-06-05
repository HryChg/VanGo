const initialState = { user: {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
}, submitted: false };

export function registrationReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return { registering: true };
        case "REGISTER_SUCCESS":
            return {};
        case "REGISTER_FAILURE":
            return {};
        case "FIELD_CHANGE":
            let newState = Object.assign({}, state);
            newState.firstName = action.payload.firstName;
            newState.lastName = action.payload.lastName;
        default:
            return state;
    }
}