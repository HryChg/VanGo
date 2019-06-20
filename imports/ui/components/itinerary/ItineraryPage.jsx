import React from 'react';
import { connect } from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';
import {handleOnMarkerClick} from "../../actions/mapContainerActions";

class ItineraryPage extends React.Component {
    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let firstItinerary = this.props.itineraries[0];
        let markers = firstItinerary.events.map((event) => {
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
        let firstItinerary = this.props.itineraries[0];
        let coordinates = firstItinerary.events.map((event, index) => {
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
                    <div className="it-map"></div> {/* Workaround Used to block out size of map */}
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