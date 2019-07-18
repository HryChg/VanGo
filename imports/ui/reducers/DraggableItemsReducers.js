import {
    GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED,
    GET_EVENT_DRAWER_SUBSCRIPTION_READY
} from "../actions/draggableItemsActions";

let initialState = {_id: null, items: [], itineraryEdit: null, ready: false, saved: false};

export default function DraggableItemsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'UPDATE_EDITED_ITEM':
            console.log(action.payload);
            if (action.payload.editing) {
                newState = Object.assign({}, state);
                newState.itineraryEdit = state.itineraryEdit;
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
            newState.itineraryEdit = state.itineraryEdit;
            newState.saved = true;
            return newState;

        case 'RESET_EDIT':
            return initialState;

        case GET_EVENT_DRAWER_SUBSCRIPTION_READY:
            return {
                ready: action.payload.ready,
                _id: state._id,
                items: state.items,
                itineraryEdit: state.itineraryEdit,
                saved: state.saved
            };

        case GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED:
            return {
                ready: state.ready,
                _id: action.payload._id,
                items: action.payload.items,
                itineraryEdit: action.payload.itineraryEdit,
                saved: state.saved
            };

        default:
            return state;
    }
}
