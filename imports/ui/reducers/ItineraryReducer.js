const initialState = 
    { itinerary: [
        {key: 1, name: "Event 1", location: "Location 1", address: "Address 1", date: "August 11, 2019"}, 
        {key: 2, name: "Event 2", location: "Location 2", address: "Address 2", date: "August 12, 2019"},
        {key: 3, name: "Event 3", location: "Location 3", address: "Address 3", date: "August 13, 2019"}], 
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