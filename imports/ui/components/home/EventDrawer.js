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

    displaySavedEvents = () => {
        if (!this.props.drawerItems){
            return <Menu.Item>User Data not ready yet</Menu.Item>
        }
        return this.props.drawerItems.items.map((selectedEvent, index) => {
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
    return {userData: state.eventDrawer.userData};
};

const EventDrawerContainer = withTracker(()=>{
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
