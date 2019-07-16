export const addEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    };
};

export const deleteEvent = (event) => {
    return {
        type: 'DELETE_EVENT',
        payload: event
    };
};

export const updateEventDrawer = (res) => {
    return {
        type: 'LOAD_EVENT_DRAWER',
        payload: res
    };
};
