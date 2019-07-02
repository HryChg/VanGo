const initialState = { name: "", email: "", password: "" };

export default function RegisterFormReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'UPDATE_REGISTER_FIELD':
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload.value;
            return newState;
        case 'CLEAR_FIELD':
                return initialState;
        default:
            return state;
    }
}