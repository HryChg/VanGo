let initialState = { categories: []};

export default function EventFilterReducer(state = initialState, action) {
    if (action.type === 'UPDATE_FILTERS'){
        console.log("these are the selected categories so far");
        console.log(action.payload);
        return {categories: action.payload}
    }
    return action;
}
