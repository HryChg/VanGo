import React from 'react';

class CurrentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({toggle: !this.state.toggle});
        $('.ui.right.sidebar')
        // .sidebar('toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('toggle');
    }

    render() {
        // These are the selected events deleted 'visible' to hide the menu
        return (
            <div>
                <div
                    className="ui right sidebar inverted vertical menu"
                    // className={this.state.toggle ? "ui right demo visible vertical inverted sidebar menu" : "ui right demo vertical inverted sidebar menu"}
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

                <button
                    className="ui pink button compact"
                    id="select-button"
                    onClick={this.handleClick}
                >Show Current Selection
                </button>

            </div>


        );
    }
}


export default CurrentSelection;
