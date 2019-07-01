const initialState = { name: "", email: "", password: "" };

export default function LoginReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'UPDATE_REGISTER_FIELD':
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload.value;
            return newState;
        default:
            return state;
    }
}