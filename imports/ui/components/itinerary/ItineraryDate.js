import React from 'react';
import { connect } from 'react-redux';
import CircleButton from './CircleButton';
import { selectID } from './../../actions/itineraryActions';

class ItineraryDate extends React.Component {
    render() {
        let displayName = this.props.name ? this.props.date + ": " + this.props.name : this.props.date;
        return(<div className="it-date-circ">
        <span className="it-date">{displayName}</span>
        <CircleButton onClick={() => {this.props.selectID(this.props.id);}}/>
        </div>);
    }
}

export default connect(null, { selectID })(ItineraryDate);