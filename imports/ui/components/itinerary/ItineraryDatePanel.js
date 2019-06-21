import React from 'react';
import { connect } from 'react-redux';
import ItineraryDate from './ItineraryDate.js';
import { selectDate } from '../../actions/itineraryActions.js';
import { withTracker } from 'meteor/react-meteor-data';

import { Itineraries } from '../../../api/itineraries.js';

class ItineraryDatePanel extends React.Component {
    render() {
        const { itineraries } = this.props.itinerary;
        const mappedDates = itineraries.map(itinerary => <ItineraryDate date={ itinerary.date } key={ itinerary.key }/>)
        return(<div>
            { mappedDates }
        </div>);
    }
}

// const mapStateToProps = (state) => {
//     return {
//         itinerary: state.itineraryStore
//     };
// }

// export default connect(mapStateToProps, { selectDate })(ItineraryDatePanel);

export default withTracker(() => {
    return {
        itineraries: Itineraries.find({}).fetch()
    };
})(ItineraryDatePanel);