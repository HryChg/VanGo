import React, {Component} from 'react';
import {Marker, Map, GoogleApiWrapper, InfoWindow, Polyline, Polygon} from 'google-maps-react';
import {googleMapsApiKey} from "../config";
import {connect} from 'react-redux';


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


 To draw lines on GoogleMapsReact
 https://stackoverflow.com/questions/47396176/use-polyline-in-google-maps-react?rq=1
 https://www.npmjs.com/package/google-maps-react
 */

const triangleCoords = [
    {lat: 49.2888, lng: -123.1111}, // Canada Place
    {lat: 49.2820, lng: -123.1171}, // downtown
    {lat: 49.2799, lng: -123.1387}, // Sunset Beach
    {lat: 49.2888, lng: -123.1111} // Canada place
];

const preloadedMarkers = [
    {latitude: 49.2888, longitude: -123.1111},
    {latitude: 49.2820, longitude: -123.1171},
    {latitude: 49.2799, longitude: -123.1387},
    {latitude: 47.3084488, longitude: -122.2140121},
    {latitude: 47.5524695, longitude: -122.0425407}];

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: preloadedMarkers,
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

        const oneMarker = <Marker
            position={{
                lat: 47.49855629475769,
                lng: -122.14184416996333
            }}
            onClick={() => console.log("You clicked me!")}
        />;

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyle}
                initialCenter={{lat: 49.2820, lng: -123.1171}}
                onClick={this.onMapClicked}
            >
                {this.displayMarkers()}


                <Marker
                    position={{
                        lat: 49.2856,
                        lng: -123.1306
                    }}
                    onClick={this.onMarkerClick}
                    name={'West End'} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <div className="ui card">
                            <div className="content">
                                <div className="header">{this.state.selectedPlace.name}</div>
                                <div className="meta">4 days ago</div>
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
