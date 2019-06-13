import React from 'react';
import { connect } from 'react-redux';
import CircleButton from './CircleButton';
import { selectDate } from './../../actions/itineraryActions';

class ItineraryDate extends React.Component {
    render() {
        return(<div className="it-date-circ">
        <span className="it-date">{this.props.date}</span>
        {/* <button onClick={() => {this.props.selectDate(this.props.date);}}>X</button> */}
        <CircleButton onClick={() => {this.props.selectDate(this.props.date);}}/>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { selectDate })(ItineraryDate);