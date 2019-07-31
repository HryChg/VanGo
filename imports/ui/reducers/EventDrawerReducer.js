let initialState = {drawer: null};

export default function EventDrawerReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOAD_EVENTDRAWER':
            return {drawer: action.payload}
        default:
            return state;
    }
}
