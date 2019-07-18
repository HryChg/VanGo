let initialState = { editing: false, selectedID: "" };

export default function ItineraryReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_ID':
            newState = Object.assign({}, state);
            newState.selectedID = action.payload;
            return newState;
        case 'EDITING_ITINERARY':
            newState = Object.assign({}, state);
            newState.editing = action.payload;
            return newState;
        default:
            return state;
    }
}
