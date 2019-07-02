import React from 'react';
import ItineraryDate from './ItineraryDate.js';
import { selectDate } from './../../actions/itineraryActions';
import { connect } from 'react-redux';

class ItineraryDatePanel extends React.Component {
    render() {
        const mappedDates = this.props.itineraries.map(itinerary => <ItineraryDate date={ itinerary.date } key={ itinerary._id }/>)
        return(<div>
            { mappedDates }
        </div>);
    }
}

export default connect(null, { selectDate })(ItineraryDatePanel);