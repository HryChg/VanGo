import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class ItineraryList extends React.Component {
    getSelectedItinerary(selectedDate) {
        let itineraries = this.props.itineraries;
        for (let x in itineraries) {
            if (itineraries[x].date === selectedDate) {
                return itineraries[x];
            }
        }
    }

    render() {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedDate);
        if (selectedItinerary) {
            const events = selectedItinerary.events;
            const mappedEvents = events.map(event => <ItineraryItem key={event.id} event={event} />);
            return(<div className="itinerary">
                <h1>Itinerary</h1>
                <ol id="itinerary-list">
                    { mappedEvents }
                </ol>
            </div>);
        }
        return <div></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: state.itineraryStore.selectedDate
    };
}

export default connect(mapStateToProps)(ItineraryList);
