let initialState = {_id: null, items: [], itineraryEdit: null, ready: false, saved: false};

export default function DraggableItemsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'UPDATE_EDITED_ITEM':
            if (action.payload.editing) {
                newState = Object.assign({}, state);
                newState.itineraryEdit.items = action.payload.newOrder;
                newState.saved = false;
                return newState;
            } else {
                return {
                    _id: state._id, 
                    items: action.payload.newOrder, 
                    itineraryEdit: state.itineraryEdit,
                    ready: state.ready, 
                    saved: false
                };
            }
        case 'SAVED_ITINERARY':
            newState = Object.assign({}, state);
            newState.itineraryEdit = null;
            newState.saved = true;
            return newState;
        case 'LOAD_EVENT_DRAWER':
            newState = Object.assign({}, state);
            newState._id = action.payload._id,
            newState.items = action.payload.items;
            newState.itineraryEdit = action.payload.itineraryEdit;
            newState.saved = state.saved;
            return newState;
        case 'RESET_EDIT':
            return initialState;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
