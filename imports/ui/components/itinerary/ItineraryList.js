import React from 'react';
import ItineraryItem from './ItineraryItem.js';

export default class ItineraryList extends React.Component {
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