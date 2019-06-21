import React from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux-meteor';
import {Marker, Polyline} from "google-maps-react";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import { withTracker } from 'meteor/react-meteor-data';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import Itineraries from '../../../api/itineraries.js';
import { Meteor } from 'meteor/meteor';

class ItineraryPage extends React.Component {
    // EFFECTS: returns itinerary with the selectedDate
    getSelectedItinerary(selectedDate) {
        let itineraries = this.props.itineraries;
        for (let x in itineraries) {
            if (itineraries[x].date === selectedDate) {
                return itineraries[x];
            }
        }
    }

    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedDate);
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
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedDate);
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
        console.log(this.props.itineraries);
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
                    <h1>{this.props.selectedDate}</h1>
                    <MapContainer width={'95%'} height={'50%'}>
                        {this.displayMarkers()}
                        {this.displayPolyLine()}
                    </MapContainer>
                    <div><ItineraryList itineraries={this.props.itineraries}/></div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        itineraries: state.itineraryStore.itineraries,
        selectedDate: state.itineraryStore.selectedDate
    };
}

// const mapTrackerToProps = (state, props) => {
//     if (Meteor.subscribe('itineraries').ready()) {
//         return { itineraries: Itineraries.find().fetch() };
//     }
//     return { itineraries: [] };
// }

// export default connect(mapTrackerToProps, mapStateToProps, { handleOnMarkerClick })(ItineraryPage);
export default connect(mapStateToProps, { handleOnMarkerClick })(ItineraryPage);

// export default withTracker(() => {
//     return {
//         itineraries: Itineraries.find().fetch()
//     };
// })(ItineraryPage);

//////

// const ItineraryPageContainer = withTracker(() => {
//     if (Meteor.subscribe('itineraries').ready()) {
//         return { itineraries: Itineraries.find().fetch() };
//     }
//     return { itineraries: [] };
// }, ItineraryPage);

// export default connect(mapStateToProps, { handleOnMarkerClick })(ItineraryPageContainer);

//////

// export default withTracker(() => {
//     return {
//         itineraries: Itineraries.find().fetch()
//     };
// }, TestContainer)

///////////

// const ItineraryPageContainer = withTracker(() => {
//     const handle = Meteor.subscribe('itineraries');
//     const itineraries = Itineraries.find().fetch();

//     return {
//         dataReady: handle.ready(),
//         itineraries
//     }
// })(ItineraryPage);

// export default connect(mapStateToProps, { handleOnMarkerClick })(ItineraryPageContainer);