import React from 'react';
import {connect} from 'react-redux';
import {Marker} from 'google-maps-react';

class MapMarker extends React.Component {
    render() {
        return <Marker
            onClick = { () => console.log("you touched me~~~") }
            title = { 'Changing Colors Garage' }
            position = {{ lat: 39.648209, lng: -75.711185 }}
            name = { 'Changing Colors Garage' }
        />;
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(MapMarker);
