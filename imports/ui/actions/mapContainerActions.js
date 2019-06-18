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

export const handleOnMapClicked = () => {
    return {
        type: 'ON_MAP_CLICKED'
    }
};
