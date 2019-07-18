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
            console.log(this.props.drawerItems)
            items = this.props.drawerItems.itineraryEdit.items;
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
                        Meteor.call('deleteFromCurrentUserDrawer', selectedEvent, (error, result)=>{
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
    return {
        userData: state.eventDrawer.userData,
        editing: state.itineraryStore.editing,
    };
};

const EventDrawerContainer = withTracker(()=>{
    // TODO: Subscribing in the client - security issue?
    if (Meteor.userId()){
        const handle = Meteor.subscribe('eventDrawer', Meteor.userId());
        const drawerItems = EventDrawerApi.findOne({user: Meteor.userId()});
        return {
            dataReady: handle.ready(),
            drawerItems: drawerItems
        }
    } else {
        const handle = Meteor.subscribe('eventDrawer', 'anon');
        const drawerItems = EventDrawerApi.findOne({user: 'anon'});
        return {
            dataReady: handle.ready(),
            drawerItems: drawerItems
        }
    }
})(EventDrawer);


export default connect(mapStateToProps, {

})(EventDrawerContainer);
