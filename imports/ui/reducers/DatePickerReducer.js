let initialState = {
    selectedDate: new Date()
};

export default function DatePickerReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DATE':
            return { selectedDate: action.payload };
        default:
            return state;
    }
}
