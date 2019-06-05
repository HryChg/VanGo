import React from 'react';
import { connect } from 'react-redux';
import {Marker} from 'google-maps-react';

class MapMarker extends React.Component {
    // TODO: Implementation to be determined, image?
    render() {
        return(<div>
                <Marker
                    title={'Test Marker'}
                    name={'SOMA'}
                    position={{lat: 20.778519, lng: -122.405640}}
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(MapMarker);
