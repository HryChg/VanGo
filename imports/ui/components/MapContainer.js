import React, {Component} from 'react';
import {Marker, Map, GoogleApiWrapper} from 'google-maps-react';
import {googleMapsApiKey} from "../config";

// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
/**
 * Here are more markers if we need them
 *
 <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} />
 <Marker
    name={'Dolores park'}
    position={{lat: 37.759703, lng: -122.428093}} />
 */

const preloadedMarkers = [{lat: 47.49855629475769, lng: -122.14184416996333},
    {latitude: 47.359423, longitude: -122.021071},
    {latitude: 47.2052192687988, longitude: -121.988426208496},
    {latitude: 47.6307081, longitude: -122.1434325},
    {latitude: 47.3084488, longitude: -122.2140121},
    {latitude: 47.5524695, longitude: -122.0425407}];

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: preloadedMarkers
        }
    }

    displayMarkers = () => {
        let markers = this.state.stores.map((store, index) => {
            // Store is the position of the marker
            // index is the array index of the marker
            return <Marker
                key={index}
                id={index}
                position={{
                    lat: store.latitude,
                    lng: store.longitude
                }}
                onClick={() => console.log("You clicked me!")}/>
        });

        return markers;
    };

    render() {
        const mapStyle = {
            width: this.props.width,
            height: this.props.height
        };

        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyle}
                initialCenter={{lat: 47.444, lng: -122.176}}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}



// TODO not sure how to incorporate this with REDUX
export default GoogleApiWrapper({
    apiKey: googleMapsApiKey
})(MapContainer);
