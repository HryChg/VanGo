import React from 'react';
import { connect } from 'react-redux';
import { selectID } from './../../actions/itineraryActions';
import { Menu } from 'semantic-ui-react';

class ItineraryDatePanel extends React.Component {
    getDisplayName(itinerary) {
        let displayName = itinerary.name ? itinerary.date + ": " + itinerary.name : itinerary.date;
        return displayName;
    }

    render() {
        const mappedDates = this.props.itineraries.map(itinerary => 
            <Menu.Item 
                fitted='horizontally'
                onClick={() => {this.props.selectID(itinerary._id);}}>{this.getDisplayName(itinerary)}
            </Menu.Item>    
        )
        return(<Menu compact inverted vertical>
            { mappedDates }
        </Menu>);
    }
}

export default connect(null, { selectID })(ItineraryDatePanel);