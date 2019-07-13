export const setSelected = (itemID) => {
    return {
        type: 'SET_SELECTED',
        payload: itemID
    }
};

export const setValue = (value) => {
    return {
        type: 'SET_VALUE',
        payload: value
    }
};

export const setIsLoadingTrue = () => {
    return {
        type: 'SET_IS_LOADING_TRUE',
    }
};

export const setIsLoadingFalse = () => {
    return {
        type: 'SET_IS_LOADING_FALSE'
    }
};

export const setResults = (results) => {
    return {
        type: "SET_RESULTS",
        payload: results
    }
};
