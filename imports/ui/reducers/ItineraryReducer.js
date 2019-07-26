let initialState = { itineraries: [], editing: false, selectedID: "" };

export default function ItineraryReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_ID':
            newState = Object.assign({}, state);
            newState.itineraries = state.itineraries;
            newState.selectedID = action.payload;
            return newState;
        case 'EDITING_ITINERARY':
            newState = Object.assign({}, state);
            newState.itineraries = state.itineraries;
            newState.editing = action.payload;
            return newState;
        case 'LOAD_ITINERARIES':
            newState = Object.assign({}, state);
            newState.itineraries = action.payload;
            newState.editing = state.editing;
            newState.selectedID = state.selectedID;
            return newState;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
