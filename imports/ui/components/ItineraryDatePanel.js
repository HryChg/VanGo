import React from 'react';
import { connect } from 'react-redux';
import ItineraryDate from './ItineraryDate.js';

class ItineraryDatePanel extends React.Component {
    render() {
        return(<div>
            <ItineraryDate/> 
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryDatePanel);