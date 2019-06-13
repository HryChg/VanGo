import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class ItineraryList extends React.Component {
    render() {
        const { selectedDate } = this.props.itinerary;
        const { itineraries } = this.props.itinerary;
        let selectedItinerary;
        console.log(selectedDate);
        for (let x in itineraries) {
            console.log(itineraries[x]);
            console.log(itineraries[x].date);
            if (itineraries[x].date === selectedDate) {
                console.log("Date has been selected!");
                selectedItinerary = itineraries[x];
                break;
            }
        }
        console.log("selectedItinerary: " + selectedItinerary);
        const events = selectedItinerary.events;
        console.log(events); // TODO: Remove!
        const mappedEvents = events.map(e => <ItineraryItem name={e.name} address={e.address} start={e.start} end={e.end} url={e.url} price={e.price}/>);
        return(<div className="itinerary">
            <h1>Itinerary</h1>
            <ol id="itinerary-list">
                { mappedEvents }
            </ol>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryList);