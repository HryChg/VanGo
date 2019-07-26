// How to use google-maps-react
// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

import React, {Component} from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';

const googleMapsApiKey = Meteor.settings.public.googleMapsApiKey;
import {handleOnMapClicked, handleOnMarkerClick, setMapLoadedTrue} from "../actions/mapContainerActions";
import MapInfoWindowContainer from "./MapInfoWindowContainer";
import CurrentEvents from '../../api/CurrentEvents';
import {Button} from "semantic-ui-react";
import {showPanel} from '../actions/panelActions';


export class MapContainer extends Component {
    handleMapIdle = () => {
        this.props.setMapLoadedTrue();
    };

    // EFFECTS: close InfoWindow when clicking on map area
    onMapClicked = (props) => {
        if (this.props.mapContainer.showingInfoWindow) {
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

        Meteor.call('saveToCurrentUserDrawer', eventToBeSaved, this.props.editing, (error, result) => {
            if (error) {
                alert(error.message);
            } else {
                // alert(`Event Saved! EventID: ${result}, EventName: ${eventToBeSaved.name}`);
                this.props.showPanel();
            }
        })
    };

    // EFFECTS: Show save button on the map info window only if specified on the property of MapContainer.
    //          E.g. in the mapContainer props --> showSaveButton={true}
    toggleSaveButton = ()=>{
        let showSaveButton = this.props.showSaveButton;
        if (showSaveButton){
            return (<Button
                className="extra content ui button"
                onClick={() => {
                    this.onSaveEventClick();
                }}>
                <i className="heart icon"/>
                Save to Event Drawer
            </Button>);
        } else {
            return <div/>
        }
    };


    render() {
        const mapStyle = {
            width: this.props.width,
            height: this.props.height,
            position: 'fixed'
        };
        const mapContainerStore = this.props.mapContainer;
        return (
            <Map
                onIdle={this.handleMapIdle}
                google={this.props.google}
                zoom={14}
                style={mapStyle}
                initialCenter={(this.props.initialCenter) ? this.props.initialCenter : {lat: 49.2820, lng: -123.1171}}
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
                                <div className="meta">Location: {mapContainerStore.selectedPlace.location}</div>
                                <div className="meta"><a href={mapContainerStore.selectedPlace.link}>Link to
                                    Website...</a></div>
                                <div className="description">{mapContainerStore.selectedPlace.description}</div>
                            </div>

                            {/*<Button*/}
                            {/*    className="extra content ui button"*/}
                            {/*    onClick={() => {*/}
                            {/*        this.onSaveEventClick();*/}
                            {/*    }}>*/}
                            {/*    <i className="heart icon"/>*/}
                            {/*    Save to Event Drawer*/}
                            {/*</Button>*/}
                            {this.toggleSaveButton()}
                        </div>
                    </div>
                </MapInfoWindowContainer>
            </Map>
        );
    }
}

const mapStateToProps = state => {
    return {
        mapContainer: state.mapContainer,
        editing: state.itineraryStore.editing,
    };
};
const apiWrapper = GoogleApiWrapper({apiKey: googleMapsApiKey})(MapContainer);

const MeteorMapContainer = withTracker(() => {
    const currentEventsHandle = Meteor.subscribe('currentEvents');
    const currentEvents = CurrentEvents.find().fetch();
    return {
        dataReady: currentEventsHandle.ready(),
        currentEvents: currentEvents,
    }
})(apiWrapper);


export default connect(mapStateToProps, {
    handleOnMapClicked: handleOnMapClicked,
    handleOnMarkerClick: handleOnMarkerClick,
    setMapLoadedTrue: setMapLoadedTrue,
    showPanel
})(MeteorMapContainer);
