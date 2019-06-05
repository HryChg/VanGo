import React from 'react';
import { connect } from 'react-redux';
import ItineraryDatePanel from './ItineraryDatePanel';
import MapView from '../MapView';
import ItineraryList from './ItineraryList';

class Itinerary extends React.Component {
    render() {
        return(<div>
            <div>
                <ItineraryDatePanel />
            </div>
            <div>
                <h1>{this.props.itinerary.selectedDate}</h1>
                <MapView/>
                <ItineraryList />
            </div>

        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Itinerary);