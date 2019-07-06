let initialState = {
    selectedDate: new Date(),
    selectedEvents: []
};

export default function DatePickerReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DATE':
            return {
                selectedDate: action.payload,
                selectedEvents: state.selectedEvents
            };
        case 'UPDATE_EVENTS':
            return {
                selectedDate: state.selectedDate,
                selectedEvents: action.payload
            };
        default:
            return state;
    }
}
