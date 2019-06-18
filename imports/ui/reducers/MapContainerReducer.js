let initialState = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    if (action.type === 'ON_MARKER_CLICK') {
        return {
            showingInfoWindow: action.showingInfoWindow,
            activeMarker: action.payload,
            selectedPlace: action.selectedPlace
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
