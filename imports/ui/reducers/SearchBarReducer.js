let initialState = { keyword: ""};

export default function SearchBarReducer(state = initialState, action) {
    if (action.type === 'SEARCH'){
        console.log(`found the ${action.payload} in the reducer!!`);
        return {keyword: action.payload}
    }
    return action;
}
