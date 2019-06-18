import React from 'react';
import {connect} from 'react-redux';
import {toggleEventDrawer} from '../../actions/eventDrawerActions';
import {VanGoStore} from "../../../../client/main";


class EventDrawer extends React.Component {

    displayCurrentSelection = () => {
        let currentSelections = VanGoStore.getState().eventDrawer.currentSelection;
        return  currentSelections.map((selectedEvent, index) => {
            return <a key={ selectedEvent.id } className="item">{selectedEvent.name}</a>
        });
    };

    render() {
        return (
            <div>
                <div
                    className="ui right sidebar inverted vertical menu"
                >
                    {this.displayCurrentSelection()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {eventDrawer: state.eventDrawer};
};

export default connect(mapStateToProps)(EventDrawer);
