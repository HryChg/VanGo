//Reference: https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

import React from 'react';
import { connect } from 'react-redux';
import { Marker, Polyline } from "google-maps-react";
import { Redirect } from 'react-router-dom';
import { Grid, Icon, Menu, Sidebar, Button } from 'semantic-ui-react';
import { handleOnMarkerClick } from "../../actions/mapContainerActions";
import { withTracker } from 'meteor/react-meteor-data';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import Itineraries from '../../../api/itineraries.js';
import { Meteor } from 'meteor/meteor';

import { selectID, editingItinerary } from './../../actions/itineraryActions';
import { changeDate } from './../../actions/datePickerActions';
import { showPanel, hidePanel } from './../../actions/panelActions';
import { formatAMPM, sortByDateName, getToday } from "../../../util/util";
import EmailForm from "./../edit/EmailForm";


class ItineraryPage extends React.Component {

    // EFFECTS: returns itinerary with the selectedID
    //          if no itineraries, return null
    //          if no selectedID, choose:
    //               - first future itinerary
    //               - if none, choose most recent itinerary
    //          if selectedID given, return itinerary if it exsits
    getSelectedItinerary(selectedID) {
        if (this.props.dataReady) {
            let itineraries = sortByDateName(this.props.itineraries);
            if (itineraries === []) {
                return null;
            } else {
                if (selectedID === "") {
                    let today = getToday();
                    for (let x in itineraries) {
                        let itineraryDate = new Date(itineraries[x].date);
                        if (itineraryDate.getTime() >= today.getTime()) {
                            return itineraries[x];
                        }
                    }
                    return itineraries[itineraries.length - 1];
                } else {
                    for (let x in itineraries) {
                        if (itineraries[x]._id === selectedID) {
                            return itineraries[x];
                        }
                    }
                }
            }
            return null;
        }
    }

    // EFFECTS: returns date of itinerary given the id
    //          if not found, return empty string
    getDateFromID(id) {
        if (this.props.dataReady) {
            let itineraries = this.props.itineraries;
            for (let x in itineraries) {
                if (itineraries[x]._id === id) {
                    return new Date(itineraries[x].date);
                }
            }
        }
        return "";
    }

    // EFFECTS: returns displayName based on selectedID
    //          if no selected ID, choose:
    //               - the first future itinerary
    //               - otherwise, choose last
    getDisplayName(selectedID) {
        let itinerary = this.getSelectedItinerary(selectedID);
        if (itinerary) {
            return itinerary.name ? itinerary.date + ': ' + itinerary.name : itinerary.date;
        }
        return "";
    }

    // EFFECTS: renders edit button when itinerary date is not in the past
    displayEditButton() {
        let today = getToday();
        let itineraryDate = this.getDateFromID(this.props.selectedID);
        if (itineraryDate) {
            if (itineraryDate.getTime() >= today.getTime()) {
                return (
                    <Button className="it-edit" onClick={() => {
                        Meteor.call('updateItinerary', this.props.selectedID);
                        this.props.editingItinerary(true);
                        let date = this.getDateFromID(this.props.selectedID)
                        this.props.changeDate(date);
                        Meteor.call('updateEvents', date);
                    }}>
                        <Icon name={"pencil"} size={"large"} color={"black"} />
                    </Button>
                );
            }
        }
    }

    // EFFECTS: display markers base on items in draggable items
    displayMarkers = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let markers = selectedItinerary.items.map((item) => {
                if (item.type === 'Attraction') {
                    return <Marker
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        start_time={(item.start_time) ? formatAMPM(new Date(item.start_time.toString())) : 'n/a'}
                        end_time={(item.end_time) ? formatAMPM(new Date(item.end_time.toString())) : 'n/a'}
                        price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                        location={item.location.display_address[0]}
                        link={item.link}
                        position={{
                            lat: item.latitude,
                            lng: item.longitude
                        }}
                        icon={{
                            url: "https://img.icons8.com/color/43/000000/compact-camera.png"
                        }}
                        description={(item.description) ? item.description : 'No Description Available'}
                        onClick={this.props.handleOnMarkerClick} />
                } else {
                    return <Marker
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        start_time={(item.start_time) ? formatAMPM(new Date(item.start_time)) : 'n/a'}
                        end_time={(item.end_time) ? formatAMPM(new Date(item.end_time)) : 'n/a'}
                        price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                        location={item.location.display_address[0]}
                        link={item.link}
                        position={{
                            lat: item.latitude,
                            lng: item.longitude
                        }}
                        description={item.description}
                        onClick={this.props.handleOnMarkerClick} />
                }
            });
            return markers;
        }
        return null;
    };

    // EFFECTS: display path based on the order of items in DraggableItems
    displayPolyLine = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let coordinates = selectedItinerary.items.map((item, index) => {
                return { lat: item.latitude, lng: item.longitude };
            });

            return (<Polyline
                path={coordinates}
                strokeColor={"#3F84CA"}
                strokeOpacity={1}
                strokeWeight={5}
            />);
        }
        return null;
    };

    // EFFECTS: If itinerary is being edited, redirect to home page; otherwise, display itinerary page
    render() {
        if (this.props.editing && this.props.dataReady) {
            return (<Redirect exact to='/' />);
        }
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='left'
                        icon='labeled'
                        inverted
                        onHide={this.props.hidePanel}
                        vertical
                        visible={this.props.visible}
                    >
                        <ItineraryDatePanel itineraries={this.props.itineraries}><h2>Itineraries</h2></ItineraryDatePanel>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Grid stackable divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <div id="it-date-toggle">
                                        <Menu inverted attached icon>
                                            <Menu.Item
                                                onClick={this.props.showPanel}>
                                                <Icon name="calendar" />
                                            </Menu.Item>
                                        </Menu>
                                    </div>
                                    <div id="itinerary-name">
                                        <h1>
                                            <span className="it-header">{this.getDisplayName(this.props.selectedID)}</span>
                                            {this.displayEditButton()}
                                        </h1>
                                    </div>
                                    <div id="it-list">
                                        <ItineraryList itinerary={this.getSelectedItinerary(this.props.selectedID)} />
                                        <EmailForm items={null}
                                            userEmail={(Meteor.user()) ? Meteor.user().emails[0].address : 'Meteor Loading'}
                                            userName={(Meteor.user()) ? Meteor.user().profile.name : 'Meteor Loading'}
                                            date={new Date().toDateString()} />
                                    </div>
                                </Grid.Column>

                                <Grid.Column>
                                    <div
                                        style={{ width: '50vw', height: '100vh' }}
                                    >
                                        <MapContainer width={'97.5%'} height={'101.5%'}>
                                            {this.displayMarkers()}
                                            {this.displayPolyLine()}
                                        </MapContainer>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedID: state.itineraryStore.selectedID,
        editing: state.itineraryStore.editing,
        visible: state.panel.visible
    };
}

const ItineraryPageContainer = withTracker(() => {
    const handle = Meteor.subscribe('userItineraries');
    const itineraries = Itineraries.find().fetch();

    return {
        dataReady: handle.ready(),
        itineraries: itineraries
    }
})(ItineraryPage);

export default connect(mapStateToProps,
    { handleOnMarkerClick, selectID, editingItinerary, showPanel, hidePanel, changeDate }
)(ItineraryPageContainer);
