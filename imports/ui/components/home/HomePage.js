import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";

import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {VanGoStore} from "../../../../client/main";
import {containAll} from "../../../util/util";


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
            if (this.fitEventFilter(event)){
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
            }


        });
        return markers;
    };

    // EFFECTS: return whether event's categories contains every item selected in eventFilter
    //          If no item selected, by default it will return true
    fitEventFilter = (event) => {
        let filterCategories = VanGoStore.getState().eventFilter.categories;
        if (filterCategories === []) return true;
        let pricePoint = this.extractPricePoint(event);
        let eventCategoriesWPrice = [...event.categories, pricePoint];
        return containAll(eventCategoriesWPrice, filterCategories);

        // TODO: handle multiple $ sign selected
    };

    // EFFECTS: extract the price point category for the event
    extractPricePoint = (event) => {
        if (event.price === 0) {
            return 'Free';
        } else if (event.price <= 10) {
            return '$';
        } else if (event.price <= 25) {
            return '$$';
        } else if (event.price <= 35) {
            return '$$$';
        } else {
            return '$$$$';
        }
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

// TODO what do I return here?
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick
})(HomePage);
