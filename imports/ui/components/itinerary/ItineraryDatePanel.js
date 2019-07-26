import React from 'react';
import { connect } from 'react-redux';
import { selectID, loadItineraries } from './../../actions/itineraryActions';
import { sortByDateName } from '../../../util/util';
import { Menu, Icon } from 'semantic-ui-react';

class ItineraryDatePanel extends React.Component {
    getDisplayName(itinerary) {
        let displayName = itinerary.name ? itinerary.date + ": " + itinerary.name : itinerary.date;
        return displayName;
    }

    render() {
        let items = this.props.itineraries;
        let sortedItems = sortByDateName(items);
        const mappedDates = sortedItems.map(itinerary =>
            <Menu.Item
                key={itinerary._id}
                fitted='horizontally'
                onClick={() => {
                    this.props.selectID(itinerary._id);
                }}
            >
                <div className="it-date">{this.getDisplayName(itinerary)}
                    <Icon name="trash" onClick={async (e) => {
                        e.stopPropagation();
                        Meteor.call('deleteItinerary', itinerary._id, (error, result) => {
                            error ? alert(error) : alert('Itinerary Deleted!');
                        })
                        this.props.selectID("");
                        // dispatch to itinerary store
                        let newItineraries = await Meteor.call('fetchItineraries', (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('fetched itineraries');
                            }
                        })
                        this.props.loadItineraries(newItineraries);
                    }
                    } />
                </div>
            </Menu.Item>
        )
        return (<Menu compact inverted vertical>
            {mappedDates}
        </Menu>);
    }
}

export default connect(null, { selectID, loadItineraries })(ItineraryDatePanel);