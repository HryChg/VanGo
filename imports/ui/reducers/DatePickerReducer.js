import {getToday} from './../../util/util.js';

let initialState = {
    selectedDate: getToday(),
    openConfirmWindow: false,
    result: 'initial state'
};

export default function DatePickerReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DATE':
            return {
                selectedDate: action.payload,
                openConfirmWindow: state.openConfirmWindow,
                result: state.result
            };
        case 'TOGGLE_CONFIRM_WINDOW':
            return {
                selectedDate: state.selectedDate,
                openConfirmWindow: !state.openConfirmWindow,
                result: state.result
            };
        case 'CONFIRM':
            return {
                selectedDate: state.selectedDate,
                openConfirmWindow: false,
                result: 'confirmed'
            };
        case 'CANCEL':
            return {
                selectedDate: state.selectedDate,
                openConfirmWindow: false,
                result: 'cancelled'
            };
        case 'LOGIN_SUCCESS':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
