const initialState = { email: "", password: "" };

export default function LoginFormReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'UPDATE_LOGIN_FIELD':
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload.value;
            return newState;
        case 'CLEAR_FIELD':
            return initialState;
        default:
            return state;
    }
}