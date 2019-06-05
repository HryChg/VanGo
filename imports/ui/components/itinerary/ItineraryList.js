import React from 'react';
import { connect } from 'react-redux';
import ItineraryItem from './ItineraryItem.js';

class ItineraryList extends React.Component {
    render() {
        const { itinerary } = this.props.itinerary;
        const mappedItinerary = itinerary.map(event => <ItineraryItem name={itinerary.name} date={itinerary.date}/>);
        return(<div>
            <h1>Itinerary</h1>
            <ol id="itinerary-list">
                { mappedItinerary }
            </ol>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryList);