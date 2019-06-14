let initialState = { keyword: ""};

export default function SearchBarReducer(state = initialState, action) {
    if (action.type === 'SEARCH'){
        return {keyword: action.payload}
    }
    return state;
}
