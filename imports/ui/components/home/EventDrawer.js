import React from 'react';
import {connect} from 'react-redux';

import {deleteEvent, loadDrawer} from '../../actions/eventDrawerActions';
import {maskString} from "../../../util/util";
import {withTracker} from "meteor/react-meteor-data";
import EventDrawerApi from "../../../api/EventDrawerApi";

class EventDrawer extends React.Component {

    // TODO call loadDrawer()

    displaySavedEvents = () => {
        let savedEventsInStore = this.props.drawerItems;
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

const EventDrawerContainer = withTracker(()=>{
    const handle = Meteor.subscribe('eventDrawer');
    const drawerItems = EventDrawerApi.find().fetch();
    return {
        dataReady: handle.ready(),
        drawerItems: drawerItems
    }
})(EventDrawer);


export default connect(mapStateToProps, {
    deleteEvent: deleteEvent,
    loadDrawer: loadDrawer
})(EventDrawerContainer);
