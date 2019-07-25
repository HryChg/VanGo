import React from 'react';
import { connect } from 'react-redux';
import { selectID } from './../../actions/itineraryActions';
import { Menu, Icon } from 'semantic-ui-react';

class ItineraryDatePanel extends React.Component {
    getDisplayName(itinerary) {
        let displayName = itinerary.name ? itinerary.date + ": " + itinerary.name : itinerary.date;
        return displayName;
    }

    render() {
        let items = this.props.itineraries;
        let sortedItems = items.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            if (dateA.getTime() === dateB.getTime()) {
                return a.name < b.name ? -1 : (a.name > b.name ? 1: 0);
            }
            return dateA - dateB;
        });
        const mappedDates = sortedItems.map(itinerary => 
            <Menu.Item 
                key={itinerary._id}
                fitted='horizontally'
                onClick={() => {this.props.selectID(itinerary._id);}}
            >
                <div className="it-date">{this.getDisplayName(itinerary)}
                <Icon name="trash" onClick={(e) => {
                    e.stopPropagation();
                    Meteor.call('deleteItinerary', itinerary._id, (error, result)=>{
                        error ? alert(error) : alert('Itinerary Deleted!');
                    })
                }}/>
                </div>
            </Menu.Item>    
        )
        return(<Menu compact inverted vertical>
            { mappedDates }
        </Menu>);
    }
}

export default connect(null, { selectID })(ItineraryDatePanel);