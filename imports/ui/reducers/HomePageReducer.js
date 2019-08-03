let initState = {
    toggleNearbyAttractions: true,
    dimmerActive: true
};

export default function HomePageReducer(state = initState, action) {
    if (action.type === 'TOGGLE_NEARBY_ATTRACTIONS'){
        return {
            toggleNearbyAttractions: !state.toggleNearbyAttractions,
            dimmerActive: state.dimmerActive
        }
    } else if (action.type === "SHOW_DIMMER"){
        return {
            toggleNearbyAttractions: state.toggleNearbyAttractions,
            dimmerActive: true
        }
    } else if (action.type === "HIDE_DIMMER"){
        return {
            toggleNearbyAttractions: state.toggleNearbyAttractions,
            dimmerActive: false
        }
    }
    return state;
}
