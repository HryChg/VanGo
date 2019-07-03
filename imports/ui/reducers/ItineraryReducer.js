let initialState = { selectedID: "" };

export default function ItineraryReducer(state = initialState, action) {
    switch(action.type) {
        case 'SELECT_ID':
            return {selectedID: action.payload};
        default:
            return state;
    }
}
