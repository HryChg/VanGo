export const updateFilters = (selectedCategories) => {
    return {
        type: 'UPDATE_FILTERS',
        payload: selectedCategories
    };
};
