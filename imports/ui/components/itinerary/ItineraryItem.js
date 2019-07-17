import React from 'react';
import {formatAMPM} from '../../../util/util'

export default class ItineraryItem extends React.Component {
    showLocation(item) {
        if (item.location.display_address[1]) {
            return (<b>
                { item.location.display_address[0] + " " + item.location.display_address[1] }
            </b>);
        } else {
            return (<b>
                { item.location.display_address[0] }
            </b>);
        }
    }
    
    showDate(item) {
        if (item.start_time && item.end_time) {
            return (<b><em>
                { formatAMPM(new Date(item.start_time.toString())) +
                ' - ' + formatAMPM(new Date(item.end_time.toString())) }
            </em></b>);
        } else if (item.start_time) {
            return (<b><em>Begins at {formatAMPM(new Date(item.start_time.toString()))}</em></b>);
        } else if (item.end_time) {
            return (<b><em>Until {formatAMPM(new Date(item.end_time.toString()))}</em></b>);
        }
        return;
    }

    render() {
        return(<div className="event-block">
                <div className="event-detail" id="event-name">{ this.props.item.name }</div>
                <div className="event-detail" id="event-address">
                    {this.showLocation(this.props.item)}
                </div>
                <div className="event-detail" id="event-duration">
                    {this.showDate(this.props.item)}
                </div>
                <div className="event-detail" id="event-description">{ this.props.item.description }</div>
                <div className="event-detail" id="event-url"><a href={ this.props.item.link }>More Details</a></div>
                <div className="event-detail" id="event-price">Price: { this.props.item.price ? "$" + this.props.item.price : 'N/A' }</div>
            </div>);
    }
}