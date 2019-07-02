// How to use google-maps-react
// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

import React, {Component} from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import {connect} from 'react-redux';

import {VanGoStore} from "../../../client/main";
import {googleMapsApiKey} from "../config";
import {handleOnMapClicked, handleOnMarkerClick} from "../actions/mapContainerActions";
import {MapInfoWindowContainer} from "./MapInfoWindowContainer";
import {addEvent} from "../actions/eventDrawerActions";
import {withTracker} from "meteor/react-meteor-data";
import CurrentEvents from "../../api/CurrentEvents";
import {toggleNearbyAttractions} from "../actions/homePageActions";
import EventDrawer from "../../api/EventDrawer";

export class MapContainer extends Component {
    // EFFECTS: close InfoWindow when clicking on map area
    onMapClicked = (props) => {
        if (VanGoStore.getState().mapContainer.showingInfoWindow) {
            this.props.handleOnMapClicked();
        }
    };

    onSaveEventClick = () => {
        // get EventID from marker
        const eventID = this.props.mapContainer.selectedPlace.id;

        // find Event in the server with EventID
        const allEvents = this.props.currentEvents;
        const eventToBeSaved = allEvents.find((element) => {
            return element._id === eventID;
        });


        EventDrawer.insert(eventToBeSaved, (error, result) => {
            if (error) console.log(`insertion to EventDrawer collection failed!! ${error}`);
            if (result) alert(`insertion to EventDrawer collection success! savedEventID: ${result}`);
        });
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
                                <div className="meta"><a href={mapContainerStore.selectedPlace.link}>Link to
                                    Website...</a></div>
                                <div className="description">{mapContainerStore.selectedPlace.description}</div>
                            </div>

                            <button
                                className="extra content ui button"
                                onClick={() => {
                                    this.onSaveEventClick();
                                }}>
                                <i className="heart icon"/>
                                Save to Event Drawer
                            </button>
                        </div>
                    </div>
                </MapInfoWindowContainer>
            </Map>
        );
    }
}

const mapStateToProps = state => {
    return {
        mapContainer: state.mapContainer
    };
};

const apiWrapper = GoogleApiWrapper({apiKey: googleMapsApiKey})(MapContainer);

const MeteorMapContainer = withTracker(() => {
    const currentEventsHandle = Meteor.subscribe('currentEvents');
    const eventDrawerHandle = Meteor.subscribe('eventDrawer');

    const currentEvents = CurrentEvents.find().fetch();
    const eventDrawer = EventDrawer.find().fetch();

    // TODO how to give access to both currentEvent and eventDrawer

    return {
        dataReady: currentEventsHandle.ready() && eventDrawerHandle,
        currentEvents: currentEvents,
        eventDrawer: eventDrawer
    }
})(apiWrapper);


export default connect(mapStateToProps, {
    handleOnMapClicked: handleOnMapClicked,
    handleOnMarkerClick: handleOnMarkerClick,
    addEvent: addEvent
})(
    MeteorMapContainer
);
