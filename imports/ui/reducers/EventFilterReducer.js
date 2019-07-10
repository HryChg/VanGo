let initialState = {categories: [], priceRange: [-1,0]};

export default function EventFilterReducer(state = initialState, action) {
    if (action.type === 'UPDATE_FILTERS'){
        return {categories: action.payload, 
                priceRange: state.priceRange}
    } else if (action.type === 'FILTER_PRICE') {
        return {categories: state.categories, 
                priceRange: action.payload}
    }
    return state;
}
