import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class ItineraryList extends React.Component {
    render() {
        if (this.props.itinerary != null) {
            const events = this.props.itinerary.events;
            const mappedEvents = events.map(event => <ItineraryItem key={event.id} event={event} />);
            return(<div className="itinerary">
                <h1>Itinerary</h1>
                <ol id="itinerary-list">
                    { mappedEvents }
                </ol>
            </div>);
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: state.itineraryStore.selectedDate
    };
}

export default connect(mapStateToProps)(ItineraryList);
