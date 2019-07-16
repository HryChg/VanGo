let initialState = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    if (action.type === 'ON_MARKER_CLICK') {
        return {
            showingInfoWindow: action.payload.showingInfoWindow,
            activeMarker: action.payload.activeMarker,
            selectedPlace: action.payload.selectedPlace // A Google Map Marker Prop
        }
    } else if (action.type === 'ON_MAP_CLICKED') {
        return {
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: state.selectedPlace
        }
    } else if (action.type === 'POP_UP_INFO_WINDOW'){
        return {
            showingInfoWindow: action.payload.showingInfoWindow,
            activeMarker: action.payload.activeMarker,
            selectedPlace: action.payload.selectedPlace
        }
    }
    return state;
}
