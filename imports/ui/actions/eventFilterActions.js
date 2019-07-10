export const updateCategories = (selectedCategories) => {
    return {
        type: 'UPDATE_FILTERS',
        payload: selectedCategories
    };
};

export const filterPrice = (price) => {
    return {
        type: 'FILTER_PRICE',
        payload: price
    };
};

