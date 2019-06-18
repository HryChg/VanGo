import React, {Component} from 'react';
import {Marker, Map, GoogleApiWrapper, InfoWindow, Polyline, Polygon} from 'google-maps-react';
import {googleMapsApiKey} from "../config";
import {connect} from 'react-redux';

import {VanGoStore} from "../../../client/main";


// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

const triangleCoords = [
    {lat: 49.2888, lng: -123.1111}, // Canada Place
    {lat: 49.2820, lng: -123.1171}, // downtown
    {lat: 49.2799, lng: -123.1387}, // Sunset Beach
    {lat: 49.2888, lng: -123.1111} // Canada place
];


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }


    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    displayMarkers = () => {
        let markers = VanGoStore.getState().currEvents.events.map((store) => {
            return <Marker
                key={store.id}
                id={store.id}
                name={store.name}
                position={{
                    lat: store.latitude,
                    lng: store.longitude
                }}
                onClick={this.onMarkerClick}/>
        });
        return markers;
    };

    render() {
        const mapStyle = {
            width: this.props.width,
            height: this.props.height,
            position: 'fixed'
        };

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyle}
                initialCenter={{lat: 49.2820, lng: -123.1171}}
                onClick={this.onMapClicked}
            >
                {this.displayMarkers()}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <div className="ui card">
                            <div className="content">
                                <div className="header">{this.state.selectedPlace.name}</div>
                                <div className="meta">StartDate: 4 days ago</div>
                                <div className="description">
                                    <p>Tucked up tightly against the city’s downtown core, the West End is
                                        one of the easiest neighbourhoods to eat pray and love!</p>
                                </div>
                            </div>
                            <div className="extra content ui button">
                                <i className="heart icon"></i>
                                Save
                            </div>
                        </div>
                    </div>
                </InfoWindow>

                {/*// Changed prop "paths" to "path".*/}
                {/*// Typo in documentation, fixed with #214*/}
                <Polyline
                    path={triangleCoords}
                    strokeColor="#3F84CA"
                    strokeOpacity={1}
                    strokeWeight={5} />

            </Map>
        );
    }
}

const mapStateToProps = state => {
    return state;
};


export default connect(mapStateToProps, null)(
    GoogleApiWrapper({
        apiKey: googleMapsApiKey
    })(MapContainer)
);
