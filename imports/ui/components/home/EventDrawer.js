import React from 'react';
import {connect} from 'react-redux';
import {toggleEventDrawer} from '../../actions/eventDrawerActions';
import {VanGoStore} from "../../../../client/main";


class EventDrawer extends React.Component {

    toggleEventDrawer = () => {
        $('.ui.right.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('toggle');

        this.props.toggleEventDrawer();
    };

    displayCurrentSelection = () => {
        let currentSelections = VanGoStore.getState().eventDrawer.currentSelection;
        console.log(currentSelections);
        return  currentSelections.map((selection, index) => {
            return <a key={ index } className="item">{selection}</a>
        });
    };

    render() {
        // These are the selected events deleted 'visible' to hide the menu

        return (
            <div>
                <div
                    className="ui right sidebar inverted vertical menu"
                >
                    {this.displayCurrentSelection()}
                </div>

                <div className="select-button">
                    <button
                        className="ui pink button"
                        id="select-button"
                        onClick={this.toggleEventDrawer}
                    >Show Current Selection
                    </button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {toggleEventDrawer})(EventDrawer);
