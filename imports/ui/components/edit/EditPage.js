import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";


import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";


class EditPage extends React.Component {
    displayMarkers = () => {
        let markers = this.props.draggableItems.items.map((event) => {
            if (event) {
                return <Marker
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    start_time={event.start_time.toDateString()}
                    end_time={event.end_time.toDateString()}
                    price={event.price}
                    link={event.link}
                    position={{
                        lat: event.latitude,
                        lng: event.longitude
                    }}
                    description={event.description}
                    onClick={this.props.handleOnMarkerClick}/>
            }
        });
        return markers;
    };


    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <h2 className={"ui header"}>Edit Itinerary for <br/>Jan 27, 2019 </h2>
                            <DraggableItems/>
                            <div className={"container"}>
                                <button className="fluid ui button">
                                    <i className="heart icon"/>
                                    Save
                                </button>
                            </div>
                        </div>
                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div style={{height: '90vh'}}>
                        <MapContainer width={'95%'} height={'95%'}>
                            {this.displayMarkers()}
                        </MapContainer>
                    </div>
                </div>
            </div>
        );
    }
}

// TODO What do I return?
const mapStateToProps = (state) => {
    return {draggableItems: state.draggableItems};
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick
})(EditPage);
