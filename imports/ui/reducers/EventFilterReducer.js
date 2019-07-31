let initialState = {categories: [], priceRange: [0,0]};

export default function EventFilterReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {categories: action.payload, 
                    priceRange: state.priceRange};
        case 'FILTER_PRICE':
            return {categories: state.categories, 
                    priceRange: action.payload};
        case 'FILTER_PRICE_BY_ENTRY':
            let priceRange = state.priceRange[1] > action.payload ? 
                [action.payload, state.priceRange[1]] : 
                [state.priceRange[0], action.payload];
            return {categories: state.categories, 
                    priceRange: priceRange};
        case 'LOGIN_SUCCESS':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
