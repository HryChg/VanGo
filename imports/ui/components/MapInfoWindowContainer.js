// Wrapping google-maps-react InfoWindow component in a container so that we can add onclick functions
// https://stackoverflow.com/questions/53615413/how-to-add-a-button-in-infowindow-with-google-maps-react

import React from 'react';
import {InfoWindow} from 'google-maps-react';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";

class MapInfoWindowContainer extends React.Component {
    constructor(props) {
        super(props);
        this.infoWindowRef = React.createRef();
        this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
        if (!this.containerElement) {
            this.containerElement = document.createElement(`div`);
        }
    }

    onInfoWindowOpen() {
        ReactDOM.render(
            React.Children.only(this.props.children),
            this.containerElement
        );
        this.infoWindowRef.current.infowindow.setContent(this.containerElement);
    }

    render() {
        return (<InfoWindow
            onOpen={this.onInfoWindowOpen}
            ref={this.infoWindowRef}
            {...this.props}
        />)
    }
}


const mapStateToProps = state => {
    return {
        mapContainer: state.mapContainer
    };
};

export default connect(mapStateToProps, {})(MapInfoWindowContainer);

