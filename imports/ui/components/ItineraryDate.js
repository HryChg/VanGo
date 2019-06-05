import React from 'react';
import { connect } from 'react-redux';

class ItineraryDate extends React.Component {
    render() {
        return(<div>
        {this.props.date}
        <button onClick={() => this.props.selectDate(this.props.date)}></button>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryDate);