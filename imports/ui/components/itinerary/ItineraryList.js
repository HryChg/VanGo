import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class ItineraryList extends React.Component {
    render() {
        const { selectedDate } = this.props.itinerary;
        const { itineraries } = this.props.itinerary;
        let selectedItinerary;
        for (let x in itineraries) {
            if (itineraries[x].date === selectedDate) {
                selectedItinerary = itineraries[x];
                break;
            }
        }
        const events = selectedItinerary.events;
        const mappedEvents = events.map(event => <ItineraryItem key={event.id} event={event} />);
        return(<div className="itinerary">
            <h1>Itinerary</h1>
            <ol id="itinerary-list">
                { mappedEvents }
            </ol>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        itinerary: state.itineraryStore
    };
}

export default connect(mapStateToProps)(ItineraryList);
