import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {VanGoStore} from "../../../../client/main";
import {Marker} from "google-maps-react";


class HomePage extends React.Component {
    toggleEventDrawer = () => {
        $('.ui.right.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'dimPage', false)
            .sidebar('toggle');
    };

    // TODO toDateString should be reformatted to yyyy/mm/dd hh:mm
    // EFFECTS: render markers based on information from currEvents.events in Redux Store
    // Note store.start_time and end_time are date object, need to convert them to strings
    displayMarkers = () => {
        let markers = VanGoStore.getState().currEvents.events.map((event) => {
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
                onClick={this.props.handleOnMarkerClick}/>
        });
        return markers;
    };


    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"} style={{padding: '8px'}}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <SearchBar/>
                            <DatePicker/>
                            <br/>
                            <EventFilter/>

                            <div className="select-button">
                                <button
                                    className="ui pink button"
                                    id="select-button"
                                    onClick={this.toggleEventDrawer}
                                >Show Current Selection
                                </button>
                            </div>
                        </div>
                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        style={{height: '90vh'}}
                    >
                        <MapContainer
                            width={'95%'}
                            height={'95%'}
                        >
                            {this.displayMarkers()}
                        </MapContainer>
                    </div>
                </div>

                <EventDrawer/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick
})(HomePage);
