import React from 'react';
import ItineraryItem from './ItineraryItem.js';

export default class ItineraryList extends React.Component {
    render() {
        if (this.props.itinerary != null) {
            const items = this.props.itinerary.items;
            const mappedItems = items.map(item => <ItineraryItem key={item._id} item={item} />);
            return(<div className="itinerary">
                <ol id="itinerary-list">
                    { mappedItems }
                </ol>
            </div>);
        } else {
            return <div></div>;
        }
    }
}