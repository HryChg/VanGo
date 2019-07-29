let initialState = {drawerItems: []};

export default function EventDrawerReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOAD_EVENTDRAWER':
            return {drawerItems: action.payload}
        default:
            return state;
    }
}
