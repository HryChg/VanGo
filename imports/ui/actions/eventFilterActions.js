export const updateFilters = (selectedCategories) => {
    return {
        type: 'UPDATE_FILTERS',
        payload: selectedCategories
    };
};

export const updatePriceRange = (selectedPricePoints) => {
    return {
        type: 'UPDATE_PRICE_RANGE',
        payload: selectedPricePoints
    }
};
