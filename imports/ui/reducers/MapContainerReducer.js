let initialState = {
    mapLoaded: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    if (action.type === 'ON_MARKER_CLICK') {
        return {
            mapLoaded: state.mapLoaded,
            showingInfoWindow: action.payload.showingInfoWindow,
            activeMarker: action.payload.activeMarker,
            selectedPlace: action.payload.selectedPlace // A Google Map Marker Prop
        }
    } else if (action.type === 'ON_MAP_CLICKED') {
        return {
            mapLoaded: state.mapLoaded,
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: state.selectedPlace
        }
    } else if (action.type === 'POP_UP_INFO_WINDOW'){
        return {
            mapLoaded: state.mapLoaded,
            showingInfoWindow: action.payload.showingInfoWindow,
            activeMarker: action.payload.activeMarker,
            selectedPlace: action.payload.selectedPlace
        }
    } else if (action.type === 'SET_MAP_LOADED_TRUE'){
        return {
            mapLoaded: true,
            showingInfoWindow: state.showingInfoWindow,
            activeMarker: state.activeMarker,
            selectedPlace: state.selectedPlace
        }
    }
    return state;
}
