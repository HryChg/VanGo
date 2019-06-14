import React from 'react';

class EventDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
    }

    toggleEventDrawer = () => {
        this.setState({toggle: !this.state.toggle});
        $('.ui.right.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('toggle');
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


export default EventDrawer;
