
let initialState = {currentSelection: ["dummyEventA", "dummyAttractionB", "dummyEventC"]};

export default function EventDrawerReducer(state = initialState, action) {
    if (action.type === 'ADD_EVENT') {
        // TODO add events to selection
    } else if (action.type === 'DELETE_EVENT') {
        // TODO remove events to selection
    }
    return state;
}
