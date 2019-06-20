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
            if (this.filterEventMarkers(event)) {
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

    // EFFECTS: return true if the event meets one of the selected categories and one of the price points
    //          If no category selected, events of all categories are considered
    //          If no price point selected, events of all price points are considered
    //          If not price point and no category selected, return true by default
    filterEventMarkers = (event) => {
        let filterCategories = VanGoStore.getState().eventFilter.categories;
        let filterPricePoints = VanGoStore.getState().eventFilter.pricePoints;
        if (filterCategories.length === 0 && filterPricePoints.length === 0) return true;

        let matchCategory;
        if (filterCategories.length === 0) {
            matchCategory = true;
        } else {
            matchCategory = containAll(filterCategories, [event.category]);
        }

        let matchPricePoints;
        if (filterPricePoints.length === 0) {
            matchPricePoints = true;
        } else {
            let eventPricePoint = this.extractPricePoint(event);
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


    // render() {
    //     return (
    //         <div className="ui grid">
    //             <div className="four wide column">
    //                 <SideNav>
    //                     <div className={"container"} style={{padding: '8px'}}>
    //                         <h2 className={"ui header"}>VanGo</h2>
    //                         <SearchBar/>
    //                         <DatePicker/>
    //                         <br/>
    //                         <EventFilter/>
    //                         <div className="select-button">
    //                             <Link
    //                                 className="ui pink button"
    //                                 id="select-button"
    //                                 to="/edit"
    //                                 onClick={() => {
    //                                     console.log('send me to next page')
    //                                 }}
    //                             >Go Make Your Itinerary
    //                             </Link>
    //                         </div>
    //
    //                         <div className="select-button">
    //                             <button
    //                                 className="ui pink button"
    //                                 id="select-button"
    //                                 onClick={this.toggleEventDrawer}
    //                             >Show Current Selection
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </SideNav>
    //             </div>
    //             <div className="twelve wide column">
    //                 <div style={{height: '90vh'}}>
    //                     <MapContainer width={'95%'} height={'95%'}>
    //                         {this.displayMarkers()}
    //                     </MapContainer>
    //                 </div>
    //             </div>
    //
    //             <EventDrawer/>
    //
    //         </div>
    //     );
    // }


    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"ui grid"} style={{padding: '8px'}}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <SearchBar/>
                            <div className={"DatePickerContainer"}>
                                <DatePicker/>
                            </div>


                            <EventFilter/>
                            <div className="select-button">
                                <Link
                                    className="ui pink button"
                                    id="select-button"
                                    to="/edit"
                                    onClick={() => {
                                        console.log('send me to next page')
                                    }}
                                >Go Make Your Itinerary
                                </Link>
                            </div>

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

// TODO what do I return here?
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick
})(HomePage);
