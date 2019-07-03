import React from 'react';
import {connect} from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import { Redirect } from 'react-router-dom';
import uniqid from 'uniqid';

import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {getDrawerItems} from "../../actions/draggableItemsActions";
import { saveItinerary, resetEditPage } from "../../actions/editPageActions";


class EditPage extends React.Component {
    componentWillUnmount() {
        this.props.resetEditPage();
    }

    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let markers = this.props.draggableItems.items.map((event) => {
            if (event) {
                return <Marker
                    key={event._id}
                    id={event._id}
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

    // EFFECTS: create a path containing id, name, date, and events
    // TODO Will have to send this to server in the future
    createItinerary = () => {
        let itineraryName = document.querySelector(".edit-page-path-name").value;
        if (itineraryName === ''){
            alert("Please enter a name for this Itinerary");
            return null;
        }

        let events = this.props.draggableItems.items;
        let itin = {
            id: uniqid(),
            name: itineraryName,
            date: this.props.datePicker.selectedDate.toDateString(), // TODO: Convert to uniform format
            events: events
        };
        
        console.log(itin);
        this.props.saveItinerary(itin);
    };


    render() {
        if (this.props.saved) {
            return (<Redirect exact to='/itinerary'/>);
        } else {
            let selectedDateString = this.props.datePicker.selectedDate.toDateString();
            return (
                <div className="ui grid">
                    <div className="four wide column">
                        <SideNav>
                            <div className={"container"}>
                                <h2 className={"ui header"}>VanGo</h2>
                                <h3 className={"ui header"}>Edit Itinerary for <br/>{selectedDateString}</h3>
                                <DraggableItems/>
                                <div className={"container"}>
                                    <div className="ui action input mini fluid">
                                        <input className={"edit-page-path-name"} type="text" placeholder={"Give it a name..."}/>
                                        <button className="ui button" onClick={this.createItinerary}>
                                            <i className="heart icon"/>
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div className={"container"}>
                                    <button className="ui button fluid" onClick={() => {alert('Work in Proegress')}}>
                                        <i className="envelope outline icon"/>
                                        Email
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
}

const mapStateToProps = (state) => {
    return {
        draggableItems: state.draggableItems,
        datePicker: state.datePicker,
        saved: state.draggableItems.saved
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick,
    saveItinerary: saveItinerary,
    resetEditPage: resetEditPage,
    getDrawerItems: getDrawerItems
})(EditPage);
