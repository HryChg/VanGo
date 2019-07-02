import {LOAD_EVENT_DRAWER_SUBSCRIPTION_READY, LOAD_EVENT_DRAWER_SUBSCRIPTION_CHANGED} from '../actions/eventDrawerActions'

let initialState = {
    toggleState: false,
    ready: false,
    savedEvents: []
};

const findDuplicate = (array, event) => {
    for (let i = 0; i < array.length; i++){
        if (array[i].id === event.id){
            return true;
        }
    }
    return false
};

export default function EventDrawerReducer(state = initialState, action) {
    if (action.type === 'ADD_EVENT') {
        const eventName = action.payload.name;

        if (findDuplicate(state.savedEvents, action.payload) === true){
            alert(`"${eventName}" is already in the drawer.\n It will not be added again.`);
            return state;
        }

        alert(`${eventName} had been added`);
        return {
            toggleState: state.toggleState,
            ready: state.ready,
            savedEvents: [...state.savedEvents, action.payload]
        };
    } else if (action.type === 'DELETE_EVENT') {
        let newSavedEvents = state.savedEvents.filter((event) => {
            return event !== action.payload;
        });
        return {
            toggleState: state.toggleState,
            ready: state.ready,
            savedEvents: newSavedEvents
        }
    }
    return state;
}
