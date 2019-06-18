export const updateCategories = (selectedCategories) => {
    return {
        type: 'UPDATE_FILTERS',
        payload: selectedCategories
    };
};

export const updatePricePoints = (selectedPricePoints) => {
    return {
        type: 'UPDATE_PRICE_RANGE',
        payload: selectedPricePoints
    }
};
