import React from 'react';
import {connect} from 'react-redux';
import { Menu } from 'semantic-ui-react';

import {deleteEvent} from '../../actions/eventDrawerActions';
import {maskString} from "../../../util/util";
import {withTracker} from "meteor/react-meteor-data";
import EventDrawerApi from "../../../api/EventDrawerApi";

class EventDrawer extends React.Component {
    displaySavedEvents = () => {
        let savedEventsInStore = this.props.drawerItems;
        return savedEventsInStore.map((selectedEvent, index) => {
            return (
                <Menu.Item
                    className={"item"}
                    key={selectedEvent._id}
                >
                    {maskString(selectedEvent.name, 25)}
                    <i className="trash icon" onClick={() => {
                        Meteor.call('removeEventFromDrawer', selectedEvent._id, (error, result)=>{
                            if (error) {
                                alert(error);
                            } else {
                                alert(`Event Deleted!`);
                            }
                        })
                    }}/>
                </Menu.Item>
            );
        });
    };

    render() {
        return (
            <div>
                {this.displaySavedEvents()}
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
    deleteEvent: deleteEvent
})(EventDrawerContainer);
