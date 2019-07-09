import React from 'react';
import { connect } from 'react-redux';
import CircleButton from './CircleButton';
import { selectID } from './../../actions/itineraryActions';
import { Menu } from 'semantic-ui-react';

class ItineraryDate extends React.Component {
    render() {
        let displayName = this.props.name ? this.props.date + ": " + this.props.name : this.props.date;
        return(
            <Menu.Item className="it-date" onClick={() => {this.props.selectID(this.props.id);}}>{displayName}</Menu.Item>
        );
    }
}

export default connect(null, { selectID })(ItineraryDate);