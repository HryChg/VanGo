let initialState = {toggleState: false};

export default function EventDrawerReducer(state = initialState, action) {
    if (action.type === 'TOGGLE_EVENT_DRAWER'){
        return {toggleState: !state.toggleState}
    }
    return state;
}
