let initialState = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    if (action.type === 'ON_MARKER_CLICK') {
        console.log(action);

        return {
            showingInfoWindow: action.payload.showingInfoWindow,
            activeMarker: action.payload.activeMarker,
            selectedPlace: action.payload.selectedPlace // A Google Map Marker
        }
    } else if (action.type === 'ON_MAP_CLICKED') {
        return {
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: state.selectedPlace
        }
    }
    return state;
}
