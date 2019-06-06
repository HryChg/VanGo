import React from 'react';
import { connect } from 'react-redux';
import CircleButton from './CircleButton';

class ItineraryDate extends React.Component {
    render() {
        return(<div className="it-date">
        {this.props.date}
        <CircleButton onClick={() => this.props.selectDate(this.props.date)}/>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryDate);