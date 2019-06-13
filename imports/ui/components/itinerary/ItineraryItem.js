import React from 'react';
import { connect } from 'react-redux';

class ItineraryItem extends React.Component {
    render() {
        return(<div className="event-block">
                <div className="event-detail" id="event-name">{ this.props.name }</div>
                <div className="event-detail" id="event-address">{ this.props.address }</div>
                <div className="event-detail" id="event-start">{ this.props.start_time }</div>
                <div className="event-detail" id="event-end">{ this.props.end_time }</div>
                <div className="event-detail" id="event-url"><a href={ this.props.url }>{ this.props.url }</a></div>
                <div className="event-detail" id="event-price">{ this.props.price }</div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryItem);