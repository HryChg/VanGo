let initialState = {sliderPrice: 0, categories: [], pricePoints: []};

export default function EventFilterReducer(state = initialState, action) {
    if (action.type === 'UPDATE_FILTERS'){
        return {sliderPrice: state.maxPrice, 
                categories: action.payload, 
                pricePoints: state.pricePoints}
    } else if (action.type === 'UPDATE_PRICE_RANGE'){
        return {sliderPrice: state.maxPrice, 
                categories: state.categories, 
                pricePoints: action.payload}
    } else if (action.type === 'FILTER_PRICE') {
        return {sliderPrice: action.payload, 
                categories: state.categories, 
                pricePoints: state.pricePoints}
    }
    return state;
}
