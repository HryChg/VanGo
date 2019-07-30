let initialState = {
    mapLoaded: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    switch(action.type) {
        case 'ON_MARKER_CLICK':
            return {
                mapLoaded: state.mapLoaded,
                showingInfoWindow: action.payload.showingInfoWindow,
                activeMarker: action.payload.activeMarker,
                selectedPlace: action.payload.selectedPlace // A Google Map Marker Prop
            }
        case 'ON_MAP_CLICKED':
            return {
                mapLoaded: state.mapLoaded,
                showingInfoWindow: false,
                activeMarker: null,
                selectedPlace: state.selectedPlace
            }
        case 'POP_UP_INFO_WINDOW':
            return {
                mapLoaded: state.mapLoaded,
                showingInfoWindow: action.payload.showingInfoWindow,
                activeMarker: action.payload.activeMarker,
                selectedPlace: action.payload.selectedPlace
            }
        case 'SET_MAP_LOADED_TRUE':
            return {
                mapLoaded: true,
                showingInfoWindow: state.showingInfoWindow,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        case 'CHANGE_DATE':
        case 'UPDATE_FILTERS':
        case 'FILTER_PRICE':
            return {
                mapLoaded: state.mapLoaded,
                showingInfoWindow: false,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        default:
            return state;
    }
}
