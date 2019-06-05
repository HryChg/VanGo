const initialState = { hidden: true, name: "", date: "", message: "", index: -1 }

export default function popupReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_MESSAGE':
            if (!state.hidden && state.message === action.payload.message && state.name === action.payload.name) {
                newState = Object.assign({}, state, state.hidden = true);
            } else {
                newState = Object.assign({}, state, state.hidden = false); 
            }
            newState.name = action.payload.name;
            newState.date = action.payload.date;
            newState.message = action.payload.message;
            return newState;
        case 'DELETE_ALL':
            newState = Object.assign({}, state, state.hidden = true);
            return newState;
        default:
            return state;
    }
}