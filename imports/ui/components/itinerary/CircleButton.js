import React from 'react';
import { connect } from 'react-redux';

class CircleButton extends React.Component {
    render() {
        return(<span className="circle-button"></span>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CircleButton);