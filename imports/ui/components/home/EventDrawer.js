import React from 'react';
import {connect} from 'react-redux';
import {toggleEventDrawer} from '../../actions/eventDrawerActions';


class EventDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleEventDrawer = () => {
        $('.ui.right.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('toggle');

        this.props.toggleEventDrawer();
    };

    render() {
        // These are the selected events deleted 'visible' to hide the menu
        return (
            <div>
                <div
                    className="ui right sidebar inverted vertical menu"
                >
                    <a className="item">
                        Event 1
                    </a>
                    <a className="item">
                        Event 2
                    </a>
                    <a className="item">
                        Event 3
                    </a>
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
