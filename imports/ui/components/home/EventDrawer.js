import React from 'react';
import {connect} from 'react-redux';
import { Menu } from 'semantic-ui-react';

import {deleteEvent, updateEventDrawer} from '../../actions/eventDrawerActions';
import {maskString} from "../../../util/util";
import {withTracker} from "meteor/react-meteor-data";
import EventDrawerApi from "../../../api/EventDrawerApi";

class EventDrawer extends React.Component {
    componentDidMount() {
        this.fetchData();
    }

    // componentDidUpdate() {
    //     console.log(`Event Drawer Updated`);
    //     this.fetchData();
    // }

    fetchData = () => {
        Meteor.call('getCurrentUserDrawer', (err, res)=>{
            if (err){
                console.log(`Error loading user data to event drawer: ${err.message}`)
            }
            this.props.updateEventDrawer(res);
        });
    };

    displaySavedEvents = () => {
        if (this.props.userData.user === "reducerInitialState"){
            return <Menu.Item>No data available. Displaying Reducer Initial State</Menu.Item>
        }

        if (this.props.userData.items.length === 0){
            return <Menu.Item>User has not saved events</Menu.Item>
        }

        return this.props.userData.items.map((selectedEvent, index) => {
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

// NOT USED
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
    updateEventDrawer: updateEventDrawer
})(EventDrawerContainer);
