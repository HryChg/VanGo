let initialState = {
    // TODO: Decide what data are needed
    toggleState: false,
    ready: false,
    savedEvents: [],
    userData: {_id: "000000000", user: "reducerInitialState", items: []}

};

const findDuplicate = (array, event) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === event.id) {
            return true;
        }
    }
    return false
};

export default function EventDrawerReducer(state = initialState, action) {
    // if (action.type === 'ADD_EVENT') {
    //     const eventName = action.payload.name;
    //
    //     if (findDuplicate(state.savedEvents, action.payload) === true){
    //         alert(`"${eventName}" is already in the drawer.\n It will not be added again.`);
    //         return state;
    //     }
    //
    //     alert(`${eventName} had been added`);
    //     return {
    //         toggleState: state.toggleState,
    //         ready: state.ready,
    //         savedEvents: [...state.savedEvents, action.payload]
    //     };
    // } else if (action.type === 'DELETE_EVENT') {
    //     let newSavedEvents = state.savedEvents.filter((event) => {
    //         return event !== action.payload;
    //     });
    //     return {
    //         toggleState: state.toggleState,
    //         ready: state.ready,
    //         savedEvents: newSavedEvents
    //     }
    // }

    if (action.type === 'LOAD_EVENT_DRAWER') {
        return {
            toggleState: state.toggleState,
            ready: state.ready,
            savedEvents: state.savedEvents,
            userData: action.payload
        }
    } else if (action.type === 'DELETE_EVENT') {
        let newUserItems = state.userData.items.filter((event) => {
            return event !== action.payload;
        });

        let newUserData = {
            _id: state.userData._id,
            user: state.userData.user,
            items: newUserItems
        };

        return {
            toggleState: state.toggleState,
            ready: state.ready,
            savedEvents: state.savedEvents,
            userData: newUserData
        }
    }
    return state;
}
