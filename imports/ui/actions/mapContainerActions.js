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
