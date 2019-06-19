import React from 'react';

export default class CircleButton extends React.Component {
    render() {
        return(<button className="circle-button" onClick={this.props.onClick}></button>);
    }
}