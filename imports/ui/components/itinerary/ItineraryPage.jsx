//Reference: https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

import React from 'react';
import { connect } from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import { withTracker } from 'meteor/react-meteor-data';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import Itineraries from '../../../api/itineraries.js';
import { Meteor } from 'meteor/meteor';

import { selectID } from './../../actions/itineraryActions';

class ItineraryPage extends React.Component {
    // EFFECTS: returns itinerary with the selectedID, if none selected, choose first if available, else null
    getSelectedItinerary(selectedID) {
        if (this.props.dataReady) {
            let itineraries = this.props.itineraries;
            if (itineraries === []) {
                return null;
            } else {
                if (selectedID === "") {
                    let firstID = itineraries ? itineraries[0]._id : "";
                    console.log(itineraries[0]._id);
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
                if (itineraries) {
                    let i = itineraries[0];
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
            <div className="ui grid">
            <div className="four wide column">
                <div className="it-panel-bkgd">
                    <div className="it-panel sidenav">
                        <h2>VanGo</h2>
                        <ItineraryDatePanel itineraries={this.props.itineraries}><h2>VanGo</h2></ItineraryDatePanel>
                    </div>
                </div>
            </div>
            <div className="twelve wide column">
                <div
                    className={"container"}
                    style={{width: '500px', height:'50vh'}}
                >
                    <h1>{this.getDisplayName(this.props.selectedID)}</h1>
                    <MapContainer width={'95%'} height={'50%'}>
                        {this.displayMarkers()}
                        {this.displayPolyLine()}
                    </MapContainer>
                    <div><ItineraryList itinerary={this.getSelectedItinerary(this.props.selectedID)}/></div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        selectedID: state.itineraryStore.selectedID
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

export default connect(mapStateToProps, { handleOnMarkerClick, selectID })(ItineraryPageContainer);