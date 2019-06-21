let initState = {
    toggleNearbyAttractions: false
};

export default function HomePageReducer(state = initState, action) {
    if (action.type === 'TOGGLE_NEARBY_ATTRACTIONS'){
        return {toggleNearbyAttractions: !state.toggleNearbyAttractions}
    }
    return state;
}
