import React from 'react';
import { connect } from 'react-redux';

class ItineraryItem extends React.Component {
    render() {
        return(<div className="event-block">
                <div id="event-name">{ this.props.event.name }</div>
                <div className="event-detail">{ this.props.event.location }</div>
                <div className="event-detail">{ this.props.event.address }</div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryItem);