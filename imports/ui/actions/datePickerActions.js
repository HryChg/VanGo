export const changeDate = (date) => {
    return {
        type: 'CHANGE_DATE',
        payload: date
    };
};

export const updateEvents = (newEvents) => {
    return {
        type: 'UPDATE_EVENTS',
        payload: newEvents
    }
}
