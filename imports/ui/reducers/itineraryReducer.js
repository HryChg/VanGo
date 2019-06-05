const initialState = 
    { itinerary: [
        {event: "API Event 1", date: "August 10, 2019"}, 
        {event: "API Event 2", date: "August 11, 2019"}, 
        {event: "API Event 3", date: "August 12, 2019"}], 
    selectedDate: "August 9, 2019" };

export default function ItineraryReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_DATE':
            newState = Object.assign({}, state, selectedDate = action.payload);
            return newState;
        default:
            return state;
    }
}