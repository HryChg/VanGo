let initState = {
    toggleNearbyAttractions: false,
    dimmerActive: true
};

export default function HomePageReducer(state = initState, action) {
    if (action.type === 'TOGGLE_NEARBY_ATTRACTIONS'){
        return {
            toggleNearbyAttractions: !state.toggleNearbyAttractions,
            dimmerActive: state.dimmerActive
        }
    }
    return state;
}
