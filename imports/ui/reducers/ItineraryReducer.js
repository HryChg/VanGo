let initialState = { selectedDate: "" };

export default function ItineraryReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_DATE':
            newState = Object.assign({}, state);
            newState.selectedDate = action.payload;
            return newState;
        default:
            return state;
    }
}
