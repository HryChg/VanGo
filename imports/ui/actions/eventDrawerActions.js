

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
