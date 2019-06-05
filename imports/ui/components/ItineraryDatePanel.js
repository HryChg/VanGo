import React from 'react';
import { connect } from 'react-redux';
import ItineraryDate from './ItineraryDate.js';
import { selectDate } from '../actions/itineraryActions.js';

class ItineraryDatePanel extends React.Component {
    render() {
        const { itinerary } = this.props.itinerary;
        const mappedDates = itinerary.map(event => <ItineraryDate date={ event.date }/> )
        return(<div>
            { mappedDates }
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { selectDate })(ItineraryDatePanel);