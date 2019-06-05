import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class Itinerary extends React.Component {
    render() {
        return(<div>
            <h1>Itinerary</h1>
            <ol id="itinerary-list">
                <li><ItineraryItem item="dummy item"/></li>
                {/* To add itinerary items from store*/}
            </ol>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Itinerary);