import React from 'react';
import {formatAMPM} from '../../../util/util'

export default class ItineraryItem extends React.Component {
    showLocation(event) {
        if (event.location.display_address[1]) {
            return (<b>
                { event.location.display_address[0] + " " + event.location.display_address[1] }
            </b>);
        } else {
            return (<b>
                { event.location.display_address[0] }
            </b>);
        }
    }
    
    showDate(event) {
        if (event.start_time && event.end_time) {
            return (<b><em>
                { formatAMPM(new Date(event.start_time.toString())) +
                ' - ' + formatAMPM(new Date(event.end_time.toString())) }
            </em></b>);
        } else if (event.start_time) {
            return (<b><em>Begins at {formatAMPM(new Date(event.start_time.toString()))}</em></b>);
        } else if (event.end_time) {
            return (<b><em>Until {formatAMPM(new Date(event.end_time.toString()))}</em></b>);
        }
        return;
    }

    render() {
        return(<div className="event-block">
                <div className="event-detail" id="event-name">{ this.props.event.name }</div>
                <div className="event-detail" id="event-address">
                    {this.showLocation(this.props.event)}
                </div>
                <div className="event-detail" id="event-duration">
                    {this.showDate(this.props.event)}
                </div>
                <div className="event-detail" id="event-description">{ this.props.event.description }</div>
                <div className="event-detail" id="event-url"><a href={ this.props.event.link }>More Details</a></div>
                <div className="event-detail" id="event-price">Price: ${ this.props.event.price ? this.props.event.price : 'N/A' }</div>
            </div>);
    }
}