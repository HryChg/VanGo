import React from 'react';
import {connect} from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import uniqid from 'uniqid';

import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";


class EditPage extends React.Component {

    // EFFECTS: display markers base on events in draggable items
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

    // EFFECTS: display path based on the order of events in DraggableItems
    displayPolyLine = () => {
        let coordinates = this.props.draggableItems.items.map((item, index) => {
            return {lat: item.latitude, lng: item.longitude};
        });

        return (<Polyline
            path={coordinates}
            strokeColor={"#3F84CA"}
            strokeOpacity={1}
            strokeWeight={5}
        />);
    };

    createPath = () => {
        let events = this.props.draggableItems.items;
        let path = {
            id: uniqid(),
            name: '', // stub
            date: this.props.datePicker.selectedDate,
            events: events
        };
        console.log(path);
    };


    render() {
        let selectedDateString = this.props.datePicker.selectedDate.toDateString();
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <h2 className={"ui header"}>Edit Itinerary for <br/>{selectedDateString}</h2>
                            <DraggableItems/>
                            <div className={"container"}>
                                <button className="fluid ui button" onClick={this.createPath}>
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
                            {this.displayPolyLine()}
                        </MapContainer>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        draggableItems: state.draggableItems,
        datePicker: state.datePicker
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick
})(EditPage);
