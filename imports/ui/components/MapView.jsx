import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {googleMapsApiKey} from '../config';

const mapStyle = {
    width: '400px',
    height: '400px'
};

export class MapView extends Component {


    render() {

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyle}
            >
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />



            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapsApiKey
})(MapView)
