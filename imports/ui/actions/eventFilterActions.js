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

export const filterPrice = (price) => {
    return {
        type: 'FILTER_PRICE',
        payload: price
    };
};

