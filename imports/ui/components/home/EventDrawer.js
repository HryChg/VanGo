import React from 'react';
import {connect} from 'react-redux';
import { Menu } from 'semantic-ui-react';

import {maskString} from "../../../util/util";
import {withTracker} from "meteor/react-meteor-data";
import EventDrawerApi from "../../../api/EventDrawerApi";

class EventDrawer extends React.Component {
    componentDidMount() {
        Meteor.call('initializeEventDrawerApi', (err, res)=>{
            if (err) console.log(`Error loading user data to event drawer: ${err.message}`);
        });
    }

    // EFFECTS: returns menu items for event drawer
    //          if editing, will return specific itinerary items being edited
    //          otherwise, return existing items in drawer
    displaySavedEvents = () => {
        if (!this.props.drawerItems){
            return <Menu.Item>User Data not ready yet</Menu.Item>
        }
        let items;
        if (this.props.editing) {
            items = this.props.drawerItems.itineraryEdit? this.props.drawerItems.itineraryEdit.items: [];
        } else {
            items = this.props.drawerItems.items;
        }
        return items.map((selectedEvent, index) => {
            return (
                <Menu.Item
                    className={"item"}
                    key={selectedEvent._id}
                >
                    {maskString(selectedEvent.name, 22)}
                    <i className="trash icon" onClick={() => {
                        Meteor.call('deleteFromCurrentUserDrawer', selectedEvent, this.props.editing, (error, result)=>{
                            if (error) {
                                alert(error);
                            } else {
                                // alert(`Event Deleted!`);
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
    return {
        userData: state.eventDrawer.userData,
        editing: state.itineraryStore.editing,
    };
};

const EventDrawerContainer = withTracker(()=>{
        const handle = Meteor.subscribe('userEventDrawer', Meteor.userId());
        const drawerItems = EventDrawerApi.findOne();
        return {
            dataReady: handle.ready(),
            drawerItems: drawerItems
        }
})(EventDrawer);


export default connect(mapStateToProps, {

})(EventDrawerContainer);
