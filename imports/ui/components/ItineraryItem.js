import React from 'react';
import { connect } from 'react-redux';

class ItineraryItem extends React.Component {
    render() {
        return(<div>{this.props.item}</div>); // TODO: passing in just an item
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryItem);