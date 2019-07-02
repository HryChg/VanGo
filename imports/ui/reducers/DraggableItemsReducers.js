let initialState = {items: [], saved: false};

export default function DraggableItemsReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'UPDATE_EDITED_ITEM':
            return {items: action.payload, saved: false};
        case 'SAVED_ITINERARY':
            newState = Object.assign({}, state);
            newState.saved = true;
            return newState;
        case 'RESET_EDIT':
            return initialState;
        default:
            return state;
    }
}
