import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {Link} from 'react-router-dom';

import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {toggleNearbyAttractions} from "../../actions/homePageActions";
import {VanGoStore} from "../../../../client/main";
import {containAll} from "../../../util/util";


class HomePage extends React.Component {
    toggleEventDrawer = () => {
        $('.ui.right.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'dimPage', false)
            .sidebar('toggle');
    };

    componentWillUnmount() {
        $('.ui.right.sidebar').detach();
    }

    // TODO toDateString should be reformatted to yyyy/mm/dd hh:mm
    // EFFECTS: render markers based on information from currEvents.events in Redux Store
    // Note store.start_time and end_time are date object, need to convert them to strings
    displayMarkers = () => {
        let markers = this.props.events.map((event) => {
            if (this.filterMarker(event)) {
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

    // EFFECTS: return true if the item meets one of the selected categories and one of the price points
    //          return false if user decides not to show nearby attraction and this item is an attraction
    //          If no category selected, items of all categories are considered
    //          If no price point selected, items of all price points are considered
    //          If no price point and no category selected, return true by default
    filterMarker = (item) => {
        let showAttractions = this.props.homePage.toggleNearbyAttractions;
        let isAttraction = item.type==='Attraction';
        if (isAttraction && !showAttractions){
            return false;
        }

        let filterCategories = this.props.eventFilter.categories;
        let filterPricePoints = this.props.eventFilter.pricePoints;
        if (filterCategories.length === 0 && filterPricePoints.length === 0) return true;

        let matchCategory;
        if (filterCategories.length === 0) {
            matchCategory = true;
        } else {
            matchCategory = containAll(filterCategories, [item.category]);
        }

        let matchPricePoints;
        if (filterPricePoints.length === 0) {
            matchPricePoints = true;
        } else {
            let eventPricePoint = this.extractPricePoint(item);
            matchPricePoints = containAll(filterPricePoints, [eventPricePoint]);
        }

        return matchCategory && matchPricePoints;
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

                        <h2 className={"ui header"}>VanGo</h2>
                        <SearchBar/>
                        <div className={"DatePickerContainer"}>
                            <DatePicker/>
                        </div>
                        <div className={"EventFilterContainer"}>
                            <EventFilter/>
                        </div>

                        <div className={"sidenav-options-container"}>
                            <div className="ui large vertical menu fluid">
                                <a className="item" onClick={this.props.toggleNearbyAttractions}>
                                    <div className="ui small teal label">1</div>
                                    {this.props.homePage.toggleNearbyAttractions?'Hide Attractions':'Show Nearby Attractions'}
                                </a>
                                <a className="item" onClick={this.toggleEventDrawer}>
                                    <div className="ui small label">1</div>
                                    Show Current Selection
                                </a>
                                <Link className="item" to="/edit">
                                    <div className="ui small label">51</div>
                                    Make Your Itinerary
                                </Link>
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

                <EventDrawer/>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        homePage: state.homePage,
        events: state.currEvents.events,
        eventFilter: state.eventFilter
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick,
    toggleNearbyAttractions: toggleNearbyAttractions
})(HomePage);
