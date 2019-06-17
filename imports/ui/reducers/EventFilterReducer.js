let initialState = {categories: []};

export default function EventFilterReducer(state = initialState, action) {
    if (action.type === 'UPDATE_FILTERS'){
        return {categories: action.payload}
    }
    return state;
}
