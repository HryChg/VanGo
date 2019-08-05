// EFFECTS: open InfoWindow specific to the clicked googlePlace
// props : the property of the googlePlace
// googlePlace: the react component googlePlace
// e     : event
export const handleOnMarkerClick = (props, marker) => {
    return {
        type: 'ON_MARKER_CLICK',
        payload: {
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        }
    }
};

// EFFECTS: close InfoWindow when clicking on map area
export const handleOnMapClicked = () => {
    return {
        type: 'ON_MAP_CLICKED'
    }
};

export const updateMapCenter = (center) => {
    return {
        type: 'UPDATE_MAP_CENTER',
        payload: center
    }
}

export const resetMapCenter = () => {
    return {
        type: 'RESET_MAP_CENTER'
    }
}

export const popUpInfoWindow = (props, marker) => {
    return {
        type: 'POP_UP_INFO_WINDOW',
        payload: {
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        }
    }
};

export const setMapLoadedTrue = () => {
    return {
        type: 'SET_MAP_LOADED_TRUE'
    }
};

export const setMapLoadedFalse = () => {
    return {
        type: 'SET_MAP_LOADED_FALSE'
    }
};