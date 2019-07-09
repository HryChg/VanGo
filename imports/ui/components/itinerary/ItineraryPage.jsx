//Reference: https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

import React from 'react';
import { connect } from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import { Grid, Icon, Button, Menu, Sidebar } from 'semantic-ui-react';
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import { withTracker } from 'meteor/react-meteor-data';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import Itineraries from '../../../api/itineraries.js';
import { Meteor } from 'meteor/meteor';

import { selectID, showItineraryPanel, hideItineraryPanel } from './../../actions/itineraryActions';

class ItineraryPage extends React.Component {
    // EFFECTS: returns itinerary with the selectedID, if none selected, choose first if available, else null
    getSelectedItinerary(selectedID) {
        if (this.props.dataReady) {
            let itineraries = this.props.itineraries;
            if (itineraries === []) {
                return null;
            } else {
                if (selectedID === "") {
                    let firstID = itineraries[0] ? itineraries[0]._id : "";
                    if (firstID) {
                        selectID(firstID);
                        selectedID = firstID;
                    } else {
                        return null;
                    }
                }
                for (let x in itineraries) {
                    if (itineraries[x]._id === selectedID) {
                        return itineraries[x];
                    }
                }
            }
        }
    }

    // EFFECTS: returns displayName based on selectedID; if not set, get first
    getDisplayName(selectedID) {
        if (this.props.dataReady) {
            let itineraries = this.props.itineraries;
            if (selectedID === "") {
                let i = itineraries[0];
                if (i) {
                    return i.name ? i.date + ': ' + i.name : i.date;
                } else {
                    return null;
                }
            } else {
                for (let x in itineraries) {
                    if (itineraries[x]._id === selectedID) {
                        let i = itineraries[x];
                        return i.name ? i.date + ': ' + i.name : i.date;
                    }
                }
            }
        }
    }

    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let markers = selectedItinerary.events.map((event) => {
                if (event) {
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
                        description={event.description}
                        onClick={this.props.handleOnMarkerClick}/>
                }
            });
            return markers;
        }
        return null;
    };

    // EFFECTS: display path based on the order of events in DraggableItems
    displayPolyLine = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let coordinates = selectedItinerary.events.map((event, index) => {
                return {lat: event.latitude, lng: event.longitude};
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

    render() {
        return(
            <div>
                <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    direction='left'
                    icon='labeled'
                    inverted
                    onHide={this.props.hideItineraryPanel}
                    vertical
                    visible={this.props.visible}
                    width="thin"
                >
                    <ItineraryDatePanel itineraries={this.props.itineraries}><h2>Itineraries</h2></ItineraryDatePanel>
                </Sidebar>

                <Sidebar.Pusher>
                    <Grid stackable divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                            {/* <Sidebar.Pusher> */}
                                <div id="it-date-toggle">
                                    <Menu inverted attached left fixed icon>
                                        <Menu.Item 
                                            onClick={this.props.showItineraryPanel}>
                                            <Icon name="calendar"/>
                                        </Menu.Item>
                                    </Menu>
                                </div>
                                <div id="itinerary-name">
                                    <h1>{this.getDisplayName(this.props.selectedID)}</h1>
                                </div>
                            {/* </Sidebar.Pusher> */}
                                <div id="it-list">
                                    <ItineraryList itinerary={this.getSelectedItinerary(this.props.selectedID)}/>  
                                </div>
                            </Grid.Column>

                            <Grid.Column>
                            <div
                                // className={"container"}
                                style={{width: '50vw', height:'96vh'}}
                            >
                                <MapContainer width={'97.5%'} height={'99.5%'}>
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
        visible: state.itineraryPanel.visible
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

export default connect(mapStateToProps, { handleOnMarkerClick, selectID, showItineraryPanel, hideItineraryPanel })(ItineraryPageContainer);