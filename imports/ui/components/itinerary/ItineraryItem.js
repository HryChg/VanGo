import React from 'react';
import { connect } from 'react-redux';

class ItineraryItem extends React.Component {
    render() {
        return(<div>{this.props.name}</div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ItineraryItem);