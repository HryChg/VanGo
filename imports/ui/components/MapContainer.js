// How to use google-maps-react
// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Polyline} from 'google-maps-react';
import {connect} from 'react-redux';

import {VanGoStore} from "../../../client/main";
import {googleMapsApiKey} from "../config";
import {handleOnMapClicked, handleOnMarkerClick} from "../actions/mapContainerActions";
import {MapInfoWindowContainer} from "./MapInfoWindowContainer";
import {addEvent} from "../actions/eventDrawerActions";

const coordsForPathGeneration = [
    {lat: 49.2888, lng: -123.1111}, // Canada Place
    {lat: 49.2820, lng: -123.1171}, // downtown
    {lat: 49.2799, lng: -123.1387}, // Sunset Beach
    {lat: 49.2888, lng: -123.1111} // Canada place
];

export class MapContainer extends Component {
    // EFFECTS: close InfoWindow when clicking on map area
    onMapClicked = (props) => {
        if (VanGoStore.getState().mapContainer.showingInfoWindow){
            this.props.handleOnMapClicked();
        }
    };

    onSaveEventClick = () => {
        // get EventID from marker
        const eventID = VanGoStore.getState().mapContainer.selectedPlace.id;

        // find Event in the store with EventID
        const allEvents = VanGoStore.getState().currEvents.events;
        const event = allEvents.find((element) => {
            return element.id === eventID;
        });

        console.log(event);
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

                {this.props.children}

                <MapInfoWindowContainer
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

                            <button
                                className="extra content ui button"
                                onClick={() => {
                                    this.onSaveEventClick();
                                }}>
                                <i className="heart icon"></i>
                                Save to Event Drawer
                            </button>
                        </div>
                    </div>
                </MapInfoWindowContainer>


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
    return {mapContainer: state.mapContainer};
};


export default connect(mapStateToProps, {
    handleOnMapClicked: handleOnMapClicked,
    handleOnMarkerClick: handleOnMarkerClick,
    addEvent: addEvent
})(
    GoogleApiWrapper({
        apiKey: googleMapsApiKey
    })(MapContainer)
);
