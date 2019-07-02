import {
    LOAD_EVENT_DRAWER_SUBSCRIPTION_CHANGED,
    LOAD_EVENT_DRAWER_SUBSCRIPTION_READY
} from "../actions/draggableItemsActions";

let initialState = {items: [], ready: false, saved: false};

export default function DraggableItemsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'UPDATE_EDITED_ITEM':
            return {items: action.payload, read: state.ready, saved: false};

        case 'SAVED_ITINERARY':
            newState = Object.assign({}, state);
            newState.items = state.items;
            newState.ready = state.ready;
            newState.saved = true;
            return newState;

        case 'RESET_EDIT':
            return initialState;

        case LOAD_EVENT_DRAWER_SUBSCRIPTION_READY:
            return {
                ready: action.payload.ready,
                items: state.items,
                saved: state.saved
            };

        case LOAD_EVENT_DRAWER_SUBSCRIPTION_CHANGED:
            return {
                ready: state.ready,
                items: action.payload,
                saved: state.saved
            };

        default:
            return state;
    }
}
