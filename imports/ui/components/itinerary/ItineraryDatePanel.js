import React from 'react';
import { connect, batch } from 'react-redux';
import { selectID, loadItineraries } from './../../actions/itineraryActions';
import { updateMapCenter } from './../../actions/mapContainerActions';
import { sortByDateName, getLatLonCenterOfEvents } from '../../../util/util';
import { Menu, Icon } from 'semantic-ui-react';
import { debounce } from 'lodash';
import { isString } from 'util';

class ItineraryDatePanel extends React.Component {
    getDisplayName(itinerary) {
        let date = isString(itinerary.date) ? itinerary.date : itinerary.date.toDateString();
        let displayName = itinerary.name ? date + ": " + itinerary.name : date;
        return displayName;
    }

    getSelectedLatLonCenter(itinerary) {
        if (!itinerary) return null;
        let center = getLatLonCenterOfEvents(itinerary.items);
        if (center) {
            this.props.updateMapCenter(center);
            return center;
        }
        return null;
    }

    render() {
        let items = this.props.itineraries;
        let sortedItems = sortByDateName(items);
        const mappedDates = sortedItems.map(itinerary =>
            <Menu.Item
                key={itinerary._id}
                fitted='horizontally'
                onClick={() => {
                    this.getSelectedLatLonCenter(itinerary); // recenters map when new itinerary is selected
                    this.props.selectID(itinerary._id);
                }}
            >
                <div className="it-date">{this.getDisplayName(itinerary)}
                    <Icon name="trash" onClick={(e) => {
                        e.stopPropagation();
                        Meteor.call('deleteItinerary', itinerary._id, (error, result) => {
                            if (error) return alert(error.reason);

                            Meteor.call('fetchItineraries', (err, res) => {
                                if (err) return console.log(err);
                                this.props.loadItineraries(res);
                                this.props.selectID("");
                            })
                        })
                    }
                    }/>
                </div>
            </Menu.Item>
        )
        return (<Menu compact inverted vertical>
            {mappedDates}
        </Menu>);
    }
}

export default connect(null, { selectID, loadItineraries, updateMapCenter })(ItineraryDatePanel);
