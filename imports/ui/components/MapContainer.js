// How to use google-maps-react
// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

import React, {Component} from 'react';
import {Marker, Map, GoogleApiWrapper, InfoWindow, Polyline, Polygon} from 'google-maps-react';
import {connect} from 'react-redux';

import {VanGoStore} from "../../../client/main";
import {googleMapsApiKey} from "../config";
import {handleOnMapClicked, handleOnMarkerClick} from "../actions/mapContainerActions";

const coordsForPathGeneration = [
    {lat: 49.2888, lng: -123.1111}, // Canada Place
    {lat: 49.2820, lng: -123.1171}, // downtown
    {lat: 49.2799, lng: -123.1387}, // Sunset Beach
    {lat: 49.2888, lng: -123.1111} // Canada place
];

export class MapContainer extends Component {
    // EFFECTS: open InfoWindow specific to the clicked marker
    // props : the property of the marker
    // marker: the react component marker
    // e     : event
    onMarkerClick = (props, marker, e) =>{
        this.props.handleOnMarkerClick(props, marker);
    };

    // EFFECTS: close InfoWindow when clicking on map area
    onMapClicked = (props) => {
        if (VanGoStore.getState().mapContainer.showingInfoWindow){
            this.props.handleOnMapClicked();
        }
    };

    // TODO toDateString should be reformatted to yyyy/mm/dd hh:mm
    // EFFECTS: render markers based on information from currEvents.events in Redux Store
    // Note store.start_time and end_time are date object, need to convert them to strings
    displayMarkers = () => {
        let markers = VanGoStore.getState().currEvents.events.map((event) => {
            return <Marker
                key={event.id}
                id={event.id}
                name={event.name}
                start_time={event.start_time.toDateString()}
                end_time={event.end_time.toDateString()}
                price={event.price}
                link={event.link}
                position={{
                    lat: event.latitude,
                    lng: event.longitude
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
        const mapContainerStore = VanGoStore.getState().mapContainer;
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
                    marker={mapContainerStore.activeMarker}
                    visible={mapContainerStore.showingInfoWindow}>
                    <div>
                        <div className="ui card">
                            <div className="content">
                                <div className="header">{mapContainerStore.selectedPlace.name}</div>
                                <div className="meta">Start Time: {mapContainerStore.selectedPlace.start_time}</div>
                                <div className="meta">End Time: {mapContainerStore.selectedPlace.end_time}</div>
                                <div className="meta">Price: {mapContainerStore.selectedPlace.price}</div>
                                <div className="meta"><a href={mapContainerStore.selectedPlace.link}>Link to Website...</a></div>


                                <div className="description">
                                    <div className="ui placeholder">
                                        <div className="paragraph">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                        <div className="paragraph">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                    </div>
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
                    path={coordsForPathGeneration}
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


export default connect(mapStateToProps, {
    handleOnMapClicked: handleOnMapClicked,
    handleOnMarkerClick: handleOnMarkerClick
})(
    GoogleApiWrapper({
        apiKey: googleMapsApiKey
    })(MapContainer)
);
