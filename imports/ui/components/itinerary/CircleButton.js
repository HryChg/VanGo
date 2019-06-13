import React from 'react';
import { connect } from 'react-redux';

class CircleButton extends React.Component {
    render() {
        return(<button className="circle-button" onClick={this.props.onClick}></button>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CircleButton);