let initialState = {categories: [], pricePoints: []};

export default function EventFilterReducer(state = initialState, action) {
    if (action.type === 'UPDATE_FILTERS'){
        return {categories: action.payload, pricePoints: state.pricePoints}
    } else if (action.type === 'UPDATE_PRICE_RANGE'){
        return {categories: state.categories, pricePoints: action.payload}
    }
    return state;
}
