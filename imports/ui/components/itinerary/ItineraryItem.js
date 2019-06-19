import React from 'react';

export default class ItineraryItem extends React.Component {
    render() {
        return(<div className="event-block">
                <div className="event-detail" id="event-name">{ this.props.name }</div>
                <div className="event-detail" id="event-address">{ this.props.address }</div>
                <div className="event-detail" id="event-duration">{ this.props.start } - { this.props.end }</div>
                <div className="event-detail" id="event-url"><a href={ this.props.url }>{ this.props.url }</a></div>
                <div className="event-detail" id="event-price">{ this.props.price }</div>
            </div>);
    }
}