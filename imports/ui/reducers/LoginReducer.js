const initialState = { 
    loggedIn: false,
    loading: false,
    error: null
};

export default function LoginReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'LOGIN_REQUEST':
            newState = Object.assign({}, state);
            newState.loading = true;
            return newState;
        case 'LOGIN_SUCCESS':
            return { loggedIn: true, loading: false, error: null };
        case 'LOGIN_FAILURE':
            newState = Object.assign({}, state);
            newState.loading = false;
            newState.error = action.payload.err;
            return newState;
        case 'LOGOUT':
            return { loggedIn: false }
        default:
            return state;
    }
}