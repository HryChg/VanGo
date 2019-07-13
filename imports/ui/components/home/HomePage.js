import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Grid, Sidebar, Menu, Icon } from 'semantic-ui-react';

import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {toggleNearbyAttractions} from "../../actions/homePageActions";
import { showPanel, hidePanel } from './../../actions/panelActions';
import {formatAMPM} from "../../../util/util";
import CurrentEvents from '../../../api/CurrentEvents';
import EventDrawerApi from "../../../api/EventDrawerApi";

class HomePage extends React.Component {

    // EFFECTS: render markers based on currentEvents Collection
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
                        url: "https://img.icons8.com/color/43/000000/compact-camera.png"
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

        // TODO: trigger a marker to open by checking the SearchBarReducer's selected itme
        return markers;
    };

    // EFFECTS: return true if the item meets one of the selected categories and is within the price range
    //          return false if user decides not to show nearby attraction and this item is an attraction
    //
    //          If no category selected, items of all categories are considered
    //          If a category has been selected and the item price is within the price range, it may be shown
    //          Price range is always in effect.
    filterItems = (item) => {
        let showAttractions = this.props.homePage.toggleNearbyAttractions;
        let isAttraction = item.type==='Attraction';
        if (isAttraction && !showAttractions){
            return false;
        }

        let filterCategories = this.props.eventFilter.categories;
        let matchCategory;
        if (filterCategories.length === 0) {
            matchCategory = true;
        } else {
            matchCategory = filterCategories.includes(item.category);
        }

        let withinPriceRange = item.price >= this.props.eventFilter.priceRange[0] &&
                               item.price <= this.props.eventFilter.priceRange[1];
        return matchCategory && withinPriceRange;
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
                            <div className={"SearchBarContainer"}>
                                <SearchBar/>
                            </div>
                            <div className={"DatePickerContainer"}>
                                <DatePicker/>
                            </div>
                            <div className={"EventFilterContainer"}>
                                <EventFilter events={this.props.currentEvents}/>
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
