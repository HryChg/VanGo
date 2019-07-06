import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';

import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {toggleNearbyAttractions} from "../../actions/homePageActions";
import {containAll} from "../../../util/util";
import CurrentEvents from '../../../api/CurrentEvents';

class HomePage extends React.Component {

    formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

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
        let markers = this.props.currentEvents.map((item) => {
            if (this.filterItems(item)) {
                if (item.type === 'Attraction') {
                    return <Marker
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    start_time={(item.start_time) ? this.formatAMPM(new Date(item.start_time.toString())) : 'n/a'}
                    end_time=  {(item.end_time) ? this.formatAMPM(new Date(item.end_time.toString())): 'n/a'}
                    price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                    location={item.location.display_address[0]}
                    link={item.link}
                    position={{
                        lat: item.latitude,
                        lng: item.longitude
                    }}
                    icon={{
                        url: "http://maps.google.com/mapfiles/kml/pal4/icon46.png"
                      }}
                    description={(item.description)?item.description:'No Description Available'}
                    onClick={this.props.handleOnMarkerClick}/>
                } else {
                    return <Marker
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    start_time={(item.start_time) ? this.formatAMPM(new Date(item.start_time)) : 'n/a'}
                    end_time=  {(item.end_time) ? this.formatAMPM(new Date(item.end_time)) : 'n/a'}
                    price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                    location={item.location.display_address[0]}
                    link={item.link}
                    position={{
                        lat: item.latitude,
                        lng: item.longitude
                    }}
                    description={item.description}
                    onClick={this.props.handleOnMarkerClick}/>
                }
            }
        });
        return markers;
    };

    // EFFECTS: return true if the item meets one of the selected categories and one of the price points
    //          return false if user decides not to show nearby attraction and this item is an attraction
    //          If no category selected, items of all categories are considered
    //          If no price point selected, items of all price points are considered
    //          If no price point and no category selected, return true by default
    filterItems = (item) => {
        let showAttractions = this.props.homePage.toggleNearbyAttractions;
        let isAttraction = item.type==='Attraction';
        if (isAttraction && !showAttractions){
            return false;
        }

        let filterCategories = this.props.eventFilter.categories;
        let filterPricePoints = this.props.eventFilter.pricePoints;
        // if (filterCategories.length === 0 && filterPricePoints.length === 0) return true; 

        let matchCategory;
        if (filterCategories.length === 0) {
            matchCategory = true;
        } else {
            matchCategory = containAll(filterCategories, [item.category]);
        }

        let matchPricePoints = item.price <= this.props.eventFilter.sliderPrice;

        return matchCategory && matchPricePoints;
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
                                    <div className="ui small teal label">31</div>
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
                        <MapContainer width={'95%'} height={'95%'} initialCenter={{lat: 49.2820, lng: -123.1171}}>
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
        maxPrice: state.maxPrice,
        homePage: state.homePage,
        eventFilter: state.eventFilter
    };
};

const HomePageContainer = withTracker(()=>{
    const handle = Meteor.subscribe('currentEvents');
    const currentEvents = CurrentEvents.find().fetch();

    return {
        dataReady: handle.ready(),
        currentEvents: currentEvents
    }
})(HomePage);

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick,
    toggleNearbyAttractions: toggleNearbyAttractions
})(HomePageContainer);
