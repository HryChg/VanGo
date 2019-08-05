import React from 'react';
import {connect} from 'react-redux';
import { Menu } from 'semantic-ui-react';

import {maskString} from "../../../util/util";
import {updateEventDrawer, updateEventDrawerAndDate} from '../../actions/draggableItemsActions';

class EventDrawer extends React.Component {
    componentDidMount() {
        Meteor.call('initializeEventDrawerApi', (err, res)=>{
            if (err) console.log(`Error loading user data to event drawer: ${err.message}`);
        });
        this.props.updateEventDrawer();
    }

    // EFFECTS: returns menu items for event drawer
    //          if editing, will return specific itinerary items being edited
    //          otherwise, return existing items in drawer
    displaySavedEvents = () => {
        if (!this.props.drawer){
            return <Menu.Item>User Data not ready yet</Menu.Item>
        }
        let items;
        if (this.props.editing) {
            items = this.props.drawer.itineraryEdit? this.props.drawer.itineraryEdit.items: [];
        } else {
            items = this.props.drawer.items;
        }
        if (items) {
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
                                    alert(error.reason);
                                } else {
                                    // alert(`Event Deleted!`);
                                }
                                this.props.updateEventDrawer();
                            });
                        }}/>
                    </Menu.Item>
                );
            });    
        }
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
        editing: state.itineraryStore.editing,
        drawer: state.draggableItems
    };
};

export default connect(mapStateToProps, {
updateEventDrawer, updateEventDrawerAndDate
})(EventDrawer);
