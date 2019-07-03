import React from 'react';
import { connect } from 'react-redux';
import CircleButton from './CircleButton';
import { selectDate } from './../../actions/itineraryActions';

class ItineraryDate extends React.Component {
    render() {
        let displayName = this.props.name ? this.props.date + ": " + this.props.name : this.props.date;
        return(<div className="it-date-circ">
        <span className="it-date">{displayName}</span>
        <CircleButton onClick={() => {this.props.selectDate(this.props.date);}}/>
        </div>);
    }
}

export default connect(null, { selectDate })(ItineraryDate);