let initialState = {isLoading: false, results: [], value: '', selected: ''};
export default function SearchBarReducer(state = initialState, action) {
    if (action.type === 'SET_SELECTED') {
        return {
            isLoading: state.isLoading,
            results: state.results,
            value: state.value,
            selected: action.payload
        }
    } else if (action.type === 'SET_VALUE') {
        return {
            isLoading: state.isLoading,
            results: state.results,
            value: action.payload,
            selected: state.selected
        }
    } else if (action.type === 'SET_IS_LOADING_TRUE') {
        return {
            isLoading: true,
            results: state.results,
            value: state.value,
            selected: state.selected
        }
    } else if (action.type === 'SET_IS_LOADING_FALSE') {
        return {
            isLoading: false,
            results: state.results,
            value: state.value,
            selected: state.selected
        }
    } else if (action.type === 'SET_RESULTS'){
        return {
            isLoading: state.isLoading,
            results: action.payload,
            value: state.value,
            selected: state.selected
        }
    }
    return state;
}
