let initialState = {
    mapLoaded: false,
    showingInfoWindow: false,
    currentCenter: {lat: 49.2820, lng: -123.1171}, // initial center for page
    activeMarker: {},
    selectedPlace: {}
};

export default function MapContainerReducer(state = initialState, action) {
    switch(action.type) {
        case 'ON_MARKER_CLICK':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: state.mapLoaded,
                showingInfoWindow: action.payload.showingInfoWindow,
                activeMarker: action.payload.activeMarker,
                selectedPlace: action.payload.selectedPlace // A Google Map Marker Prop
            }
        case 'ON_MAP_CLICKED':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: state.mapLoaded,
                showingInfoWindow: false,
                activeMarker: null,
                selectedPlace: state.selectedPlace
            }
        case 'UPDATE_MAP_CENTER':
            return {
                currentCenter: action.payload,
                mapLoaded: state.mapLoaded,
                showingInfoWindow: state.showingInfoWindow,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        case 'RESET_MAP_CENTER':
            return initialState;
        case 'POP_UP_INFO_WINDOW':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: state.mapLoaded,
                showingInfoWindow: action.payload.showingInfoWindow,
                activeMarker: action.payload.activeMarker,
                selectedPlace: action.payload.selectedPlace
            }
        case 'SET_MAP_LOADED_TRUE':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: true,
                showingInfoWindow: state.showingInfoWindow,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        case 'SET_MAP_LOADED_FALSE':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: false,
                showingInfoWindow: state.showingInfoWindow,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        case 'CHANGE_DATE':
        case 'UPDATE_FILTERS':
        case 'FILTER_PRICE':
            return {
                currentCenter: state.currentCenter,
                mapLoaded: state.mapLoaded,
                showingInfoWindow: false,
                activeMarker: state.activeMarker,
                selectedPlace: state.selectedPlace
            }
        case 'LOGIN_SUCCESS':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
