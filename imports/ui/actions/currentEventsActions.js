export const loadCurrentEvents = (events) => {
    return {
        type: 'LOAD_CURRENT_EVENTS',
        payload: events
    }
}