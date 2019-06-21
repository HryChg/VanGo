import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD

=======
import {Marker, Polyline} from "google-maps-react";
>>>>>>> master
import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';
import {handleOnMarkerClick} from "../../actions/mapContainerActions";

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
    };

    // EFFECTS: display path based on the order of events in DraggableItems
    displayPolyLine = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedDate);
        let coordinates = selectedItinerary.events.map((event, index) => {
            return {lat: event.latitude, lng: event.longitude};
        });

        return (<Polyline
            path={coordinates}
            strokeColor={"#3F84CA"}
            strokeOpacity={1}
            strokeWeight={5}
        />);
    };

    render() {
        return(
            <div className="ui grid">
            <div className="four wide column">
                <div className="it-panel-bkgd">
                    <div className="it-panel sidenav">
                        <h2>VanGo</h2>
                        <ItineraryDatePanel><h2>VanGo</h2></ItineraryDatePanel>
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
                    <div><ItineraryList/></div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    console.log(state.itineraryStore);
    return {
        itineraries: state.itineraryStore.itineraries,
        selectedDate: state.itineraryStore.selectedDate
    };
}

export default connect(mapStateToProps, { handleOnMarkerClick })(ItineraryPage);