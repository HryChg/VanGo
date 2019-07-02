const initialState = {
    register: false, 
    loading: false, 
    error: null };

export default function RegisterReducer(state = initialState, action) {
    switch(action.type) {
        case 'RESET_REGISTER_PAGE': 
            return initialState;
        case 'REGISTER_REQUEST':
            return {register: false, loading: true, error: null};
        case 'REGISTER_SUCCESS':
            return {register: true, loading: false, error: null};
        case 'REGISTER_FAILURE':
            return {register: false, loading: false, error: action.payload};
        default:
            return state;
    }
}