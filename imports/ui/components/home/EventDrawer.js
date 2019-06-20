import React from 'react';
import {connect} from 'react-redux';

import {deleteEvent} from '../../actions/eventDrawerActions';
import {maskString} from "../../../util/util";

class EventDrawer extends React.Component {
    displaySavedEvents = () => {
        let savedEventsInStore = this.props.eventDrawer.savedEvents;
        return savedEventsInStore.map((selectedEvent, index) => {
            return (
                <a className={"item"}
                   key={selectedEvent.id}
                   className="item">
                    <i className="trash icon" onClick={() => {
                        this.props.deleteEvent(selectedEvent);
                    }}/>
                    {maskString(selectedEvent.name, 25)}
                </a>
            );
        });
    };

    render() {
        return (
            <div>
                <div
                    className="ui right sidebar inverted vertical menu"
                >
                    {this.displaySavedEvents()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {eventDrawer: state.eventDrawer};
};

export default connect(mapStateToProps, {
    deleteEvent: deleteEvent
})(EventDrawer);
