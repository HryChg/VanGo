import React from 'react';
import { connect } from 'react-redux';

class Marker extends React.Component {
    render() {
        return(<div>
            {/* TODO: Implementation to be determined, image? */}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Marker);