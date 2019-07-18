import {
    GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED,
    GET_EVENT_DRAWER_SUBSCRIPTION_READY
} from "../actions/draggableItemsActions";

let initialState = {_id: null, items: [], editItems: [], ready: false, saved: false};

export default function DraggableItemsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'UPDATE_EDITED_ITEM':
            return {
                _id: state._id, 
                items: action.payload, 
                editItems: state.editItems,
                ready: state.ready, 
                saved: false
            };

        case 'SAVED_ITINERARY':
            newState = Object.assign({}, state);
            newState._id = state._id;
            newState.items = state.items;
            newState.editItems = state.editItems;
            newState.ready = state.ready;
            newState.saved = true;
            return newState;

        case 'RESET_EDIT':
            return initialState;

        case GET_EVENT_DRAWER_SUBSCRIPTION_READY:
            return {
                ready: action.payload.ready,
                _id: state._id,
                items: state.items,
                editItems: state.editItems,
                saved: state.saved
            };

        case GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED:
            return {
                ready: state.ready,
                _id: action.payload._id,
                items: action.payload.items,
                editItems: action.payload.itineraryEdit,
                saved: state.saved
            };

        default:
            return state;
    }
}
