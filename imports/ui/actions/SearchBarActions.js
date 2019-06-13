export const search = (keyword) => {
    return {
        type: 'SEARCH',
        payload: keyword
    };
};
