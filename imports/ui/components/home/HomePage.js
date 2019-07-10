import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Grid, Sidebar, Menu, Icon } from 'semantic-ui-react';

import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {toggleNearbyAttractions} from "../../actions/homePageActions";
import { showPanel, hidePanel } from './../../actions/panelActions';
import {containAll, formatAMPM} from "../../../util/util";
import CurrentEvents from '../../../api/CurrentEvents';
import EventDrawerApi from "../../../api/EventDrawerApi";

class HomePage extends React.Component {

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
                    start_time={(item.start_time) ? formatAMPM(new Date(item.start_time.toString())) : 'n/a'}
                    end_time=  {(item.end_time) ? formatAMPM(new Date(item.end_time.toString())): 'n/a'}
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
                    start_time={(item.start_time) ? formatAMPM(new Date(item.start_time)) : 'n/a'}
                    end_time=  {(item.end_time) ? formatAMPM(new Date(item.end_time)) : 'n/a'}
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

        // let matchPricePoints;
        // if (filterPricePoints.length === 0) {
        //     matchPricePoints = true;
        // } else {
        //     let eventPricePoint = this.extractPricePoint(item);
        //     matchPricePoints = containAll(filterPricePoints, [eventPricePoint]);
        // }

        let matchPricePoints = item.price <= this.props.eventFilter.sliderPrice;

        return matchCategory && matchPricePoints;
    };

    // EFFECTS: extract the price point category for the item
    extractPricePoint = (item) => {
        if (item.price === 0) {
            return 'Free';
        } else if (item.price <= 10) {
            return '$';
        } else if (item.price <= 25) {
            return '$$';
        } else if (item.price <= 50) {
            return '$$$';
        } else {
            return '$$$$';
        }
    };


    render() {
        return (
            <div>
            <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                onHide={this.props.hidePanel}
                vertical
                visible={this.props.visible}
            >
                <EventDrawer/>
            </Sidebar>

            <Sidebar.Pusher>
            <div>
            <Grid stackable divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <div className={"home-panel"}>
                            <h2>
                                <Icon className="logo" name="street view"/> 
                                VanGo
                            </h2>
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
                                    <a className="item" onClick={this.props.showPanel}>
                                        <div className="ui small label">{ this.props.dataReadySaved ? this.props.savedEvents.length : 0 }</div>
                                        Show Current Selection
                                    </a>
                                    <Link className="item" to="/edit">
                                        Plan Your Itinerary
                                        <Icon className="next-button" name="caret square right" size="large"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <div style={{height: '94vh'}}>
                            <MapContainer width={'98%'} height={'100%'} initialCenter={{lat: 49.2820, lng: -123.1171}}>
                                {this.displayMarkers()}
                            </MapContainer>
                        </div>
                    </Grid.Column>
                
                </Grid.Row>
            </Grid>
            </div>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
        maxPrice: state.maxPrice,
        homePage: state.homePage,
        eventFilter: state.eventFilter,
        visible: state.panel.visible
    };
};

const HomePageContainer = withTracker(()=>{
    const handle = Meteor.subscribe('currentEvents');
    const currentEvents = CurrentEvents.find().fetch();
    
    const handleSaved = Meteor.subscribe('eventDrawer');
    const savedEvents = EventDrawerApi.find().fetch();

    return {
        dataReady: handle.ready(),
        currentEvents: currentEvents,
        dataReadySaved: handleSaved.ready(),
        savedEvents: savedEvents
    }
})(HomePage);

export default connect(mapStateToProps, {
    handleOnMarkerClick,
    toggleNearbyAttractions,
    showPanel, 
    hidePanel 
})(HomePageContainer);
