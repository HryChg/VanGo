const initialState = { name: "", email: "", password: "" };

export default function LoginReducer(state = initialState, action) {
    switch(action.type) {
        case 'REGISTER_REQUEST':
            return null; // TODO
        default:
            return state;
    }
}