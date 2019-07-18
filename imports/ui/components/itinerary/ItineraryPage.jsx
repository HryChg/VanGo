//Reference: https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

import React from 'react';
import { connect } from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import { Redirect, NavLink } from 'react-router-dom';
import { Grid, Icon, Menu, Sidebar, Button } from 'semantic-ui-react';
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import { withTracker } from 'meteor/react-meteor-data';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import Itineraries from '../../../api/itineraries.js';
import { Meteor } from 'meteor/meteor';

import { selectID, editingItinerary } from './../../actions/itineraryActions';
import { showPanel, hidePanel } from './../../actions/panelActions';
import { formatAMPM } from "../../../util/util";

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
                    end_time=  {(item.end_time) ? formatAMPM(new Date(item.end_time.toString())): 'n/a'}
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
                    description={(item.description)?item.description:'No Description Available'}
                    onClick={this.props.handleOnMarkerClick}/>
                } else {
                    return <Marker
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    start_time={(item.start_time) ? formatAMPM(new Date(item.start_time)) : 'n/a'}
                    end_time=  {(item.end_time) ? formatAMPM(new Date(item.end_time)) : 'n/a'}
                    price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                    location={item.location.display_address[0]}
                    link={item.link}
                    position={{
                        lat: item.latitude,
                        lng: item.longitude
                    }}
                    description={item.description}
                    onClick={this.props.handleOnMarkerClick}/>
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
                return {lat: item.latitude, lng: item.longitude};
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
        if (this.props.editing) {
            return (<Redirect exact to='/'/>);
        }
        return(
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
                                            <Icon name="calendar"/>
                                        </Menu.Item>
                                    </Menu>
                                </div>
                                <div id="itinerary-name">
                                    <h1>
                                        <span className="it-header">{this.getDisplayName(this.props.selectedID)}</span>
                                        <Button className="it-edit" icon="pencil large black" onClick={() => {
                                            Meteor.call('updateItinerary', this.props.selectedID);
                                        }}/>
                                    </h1>
                                </div>
                                <div id="it-list">
                                    <ItineraryList itinerary={this.getSelectedItinerary(this.props.selectedID)}/>  
                                </div>
                            </Grid.Column>

                            <Grid.Column>
                            <div
                                style={{width: '50vw', height:'100vh'}}
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
    { handleOnMarkerClick, selectID, editingItinerary, showPanel, hidePanel }
    )(ItineraryPageContainer);