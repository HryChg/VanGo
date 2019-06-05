import React from 'react';
import { connect } from 'react-redux';
import {Marker} from 'google-maps-react';

class MapMarker extends React.Component {
    // TODO: Implementation to be determined, image?
    render() {
        return <Marker
            key={this.props.key}
            id={this.props.id}
            position={{
                lat: this.props.latitude,
                lng: this.props.longitude
            }}
            onClick={() => console.log("You clicked me!")}
        />
    }
}

// export default MapMarker;

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(MapMarker);
