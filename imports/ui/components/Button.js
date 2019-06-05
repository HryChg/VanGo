import React from 'react';
import { connect } from 'react-redux';

class Button extends React.Component {
    render() {
        return(<div>
            <button onClick={this.props.action}>{this.props.label}</button>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Button);