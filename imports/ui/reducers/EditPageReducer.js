let initialState = {saved: false};

export default function EditPageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVED_ITINERARY':
            return {saved: true};
        case 'RESET_EDIT':
            return initialState;
        default:
            return state;
    }
}
