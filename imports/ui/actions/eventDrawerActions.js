export const toggleEventDrawer = () => {
    return {
        type: 'TOGGLE_EVENT_DRAWER'
    };
};

export const addEvent = (EventName) => {
    return {
        type: 'ADD_EVENT',
        payload: EventName
    };
};

export const deleteEvent = (EventName) => {
    return {
        type: 'DELETE_EVENT',
        payload: EventName
    };
};
