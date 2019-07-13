export const search = (keyword) => {
    return {
        type: 'SEARCH',
        payload: keyword
    };
};


export const sendResultToMap = (itemID) => {
    return {
        type: 'OPEN_SELECTED_RESULT_ON_MAP',
        payload: itemID
    }
};
