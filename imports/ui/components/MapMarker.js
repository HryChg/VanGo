import React from 'react';
import {Marker} from 'google-maps-react';

class MapMarker extends React.Component {
    // TODO find out a way to return original <Marker></Marker> intead of <MapMarker> <Marker></Marker> </MapMarker>
    render() {
        return <Marker
            position={{
                lat: 47.49855629475769,
                lng: -122.14184416996333
            }}
            onClick={() => console.log("You clicked me!")}
        />
    }
}

export default MapMarker;
