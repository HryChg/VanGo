import React from 'react';
import ItineraryDate from './ItineraryDate.js';

export default class ItineraryDatePanel extends React.Component {
    render() {
        const mappedDates = this.props.itineraries.map(itinerary => 
        <ItineraryDate date={ itinerary.date } name={ itinerary.name } key={ itinerary._id } id={ itinerary._id }/>)
        return(<div>
            { mappedDates }
        </div>);
    }
}