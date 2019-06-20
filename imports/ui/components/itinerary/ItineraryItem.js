import React from 'react';

// Options for displaying date and time
let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};


export default class ItineraryItem extends React.Component {


    render() {
        return(<div className="event-block">
                <div className="event-detail" id="event-name">{ this.props.event.name }</div>
                <div className="event-detail" id="event-address">{ this.props.event.address }</div>
                <div className="event-detail" id="event-duration">
                    <b><em>
                        { this.props.event.start_time.toLocaleDateString('default', options) } 
                        - { this.props.event.end_time.toLocaleDateString('default', options) }
                    </em></b>
                </div>
                <div className="event-detail" id="event-description">{ this.props.event.description }</div>
                <div className="event-detail" id="event-url"><a href={ this.props.event.link }>{ this.props.event.link }</a></div>
                <div className="event-detail" id="event-price">${ this.props.event.price }</div>
            </div>);
    }
}