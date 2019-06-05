const initialState = 
    { itinerary: [
        {name: "API Event 1", date: "Never"}, 
        {name: "API Event 2", date: "Today"}, 
        {name: "API Event 3", date: "Saturday"}], 
    selectedDate: "Fake Date" };

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