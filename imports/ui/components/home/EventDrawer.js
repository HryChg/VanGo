import React from 'react';
import {connect} from 'react-redux';

import {toggleEventDrawer} from '../../actions/eventDrawerActions';
import {VanGoStore} from "../../../../client/main";
import {maskString} from "../../../util/util";


class EventDrawer extends React.Component {

    displaySavedEvents = () => {
        let savedEventsInStore = VanGoStore.getState().eventDrawer.savedEvents;
        return savedEventsInStore.map((selectedEvent, index) => {

            // TODO the delete button from the item
            return (

                <a className={"item"}
                   key={selectedEvent.id}
                   className="item">

                    <i className="trash icon" onClick={() => {
                        console.log('hi');
                    }}></i>

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

export default connect(mapStateToProps)(EventDrawer);
