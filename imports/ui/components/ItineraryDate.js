import React from 'react';
import { connect } from 'react-redux';

class ItineraryDate extends React.Component {
    render() {
        return(<div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryDate);