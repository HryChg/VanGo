let initialState = {currentEvents: []};

export default function CurrentEventsReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_CURRENT_EVENTS':
            return {currentEvents: action.payload};
        default:
            return state;
    }
}
