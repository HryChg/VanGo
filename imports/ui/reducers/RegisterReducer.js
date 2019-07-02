const initialState = {
    register: false, 
    loading: false, 
    error: null };

export default function LoginReducer(state = initialState, action) {
    switch(action.type) {
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