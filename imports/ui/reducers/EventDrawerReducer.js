
let initialState = {toggleState: false, currentSelection: ["dummyEventA", "dummyAttractionB", "dummyEventC"]};

export default function EventDrawerReducer(state = initialState, action) {
    if (action.type === 'TOGGLE_EVENT_DRAWER') {
        // Need to return a completed new instance!
        return {
            toggleState: !state.toggleState,
            currentSelection: state.currentSelection
        }
    } else if (action.type === 'ADD_EVENT') {
        // TODO add events to selection
    } else if (action.type === 'DELETE_EVENT') {
        // TODO remove events to selection
    }
    return state;
}
