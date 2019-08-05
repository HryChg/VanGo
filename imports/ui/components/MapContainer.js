// How to use google-maps-react
// Reference: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Connect google-maps-react to redux
// https://medium.com/@schlunzk/integrating-google-maps-api-in-react-redux-part-1-6b036014f4a6

import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import {connect} from 'react-redux';
import debounceRender from 'react-debounce-render';

const googleMapsApiKey = Meteor.settings.public.googleMapsApiKey;
import {handleOnMapClicked, setMapLoadedTrue, setMapLoadedFalse} from "../actions/mapContainerActions";
import MapInfoWindowContainer from "./MapInfoWindowContainer";
import {Button} from "semantic-ui-react";
import {showPanel} from '../actions/panelActions';
import {updateEventDrawer} from '../actions/draggableItemsActions';


export class MapContainer extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let exception1 = this.props.ignoreException !== nextProps.ignoreException;
        let exception2 = this.props.ignoreException2 !== nextProps.ignoreException2;
        let exception3 = this.props.mapContainer.showingInfoWindow !== nextProps.mapContainer.showingInfoWindow;
        if (exception1 || exception2 || exception3) {
            return true;
        }
        let ignoreParentPropChange = this.props.ignore !== nextProps.ignore;
        let ignoreParentPropChange2 = this.props.ignore2 !== nextProps.ignore2;
        if (ignoreParentPropChange || ignoreParentPropChange2) {
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        this.props.setMapLoadedFalse();
    }

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
            }
            this.props.updateEventDrawer();
        })
    };

    // EFFECTS: Show save button on the map info window only if specified on the property of MapContainer.
    //          E.g. in the mapContainer props --> showSaveButton={true}
    toggleSaveButton = () => {
        let showSaveButton = this.props.showSaveButton;
        if (showSaveButton) {
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


    defaultBounds = () => {
        let bounds = new this.props.google.maps.LatLngBounds();
        let points = [{lat: 49.2827, lng: -123.1207}, {lat: 49.3043, lng: -123.1443}];
        for (let i = 0; i < points.length; i++){
            bounds.extend(points[i]);
        }
        return bounds;
    };


    render() {
        const mapStyle = {
            width: this.props.width,
            height: this.props.height,
            position: 'fixed'
        };
        const mapContainerStore = this.props.mapContainer;

        if (this.props.setBounds === true){
            return (
                <Map
                    onReady={this.props.setMapLoadedTrue}
                    google={this.props.google}
                    zoom={14}
                    style={mapStyle}
                    initialCenter={this.props.center ? this.props.center : this.props.mapContainer.currentCenter}
                    center={this.props.center ? this.props.center : this.props.mapContainer.currentCenter}
                    onClick={this.onMapClicked}
                    bounds={this.props.bounds ? this.props.bounds : this.defaultBounds()}
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
                                {this.toggleSaveButton()}
                            </div>
                        </div>
                    </MapInfoWindowContainer>
                </Map>
            );
        } else {
            return (
                <Map
                    onReady={this.props.setMapLoadedTrue}
                    google={this.props.google}
                    zoom={14}
                    style={mapStyle}
                    initialCenter={this.props.center ? this.props.center : this.props.mapContainer.currentCenter}
                    center={this.props.center ? this.props.center : this.props.mapContainer.currentCenter}
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
                                {this.toggleSaveButton()}
                            </div>
                        </div>
                    </MapInfoWindowContainer>
                </Map>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        mapContainer: state.mapContainer,
        editing: state.itineraryStore.editing,
        currentEvents: state.currentEventsStore.currentEvents
    };
};
const apiWrapper = GoogleApiWrapper({apiKey: googleMapsApiKey})(MapContainer);

// Possible fix but timeout needs to be 750 ms+ (slow)
// The issue with this is that info window is also slow to load
const debouncedMapContainer = debounceRender(apiWrapper, 200, {leading: false, trailing: true});

export default connect(mapStateToProps, {
    handleOnMapClicked: handleOnMapClicked,
    setMapLoadedTrue: setMapLoadedTrue,
    setMapLoadedFalse,
    updateEventDrawer,
    showPanel
})(debouncedMapContainer);
