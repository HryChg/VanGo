import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import {Grid, Sidebar, Menu, Icon} from 'semantic-ui-react';

import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {toggleNearbyAttractions} from "../../actions/homePageActions";
import {showPanel, hidePanel} from './../../actions/panelActions';
import {containOneOf, formatAMPM} from "../../../util/util";
import CurrentEvents from '../../../api/CurrentEvents';
import EventDrawerApi from "../../../api/EventDrawerApi";

class HomePage extends React.Component {

    filterMarkersOnSearch(markers){
        let selectedID = this.props.searchBar.selected;
        if (selectedID === ''){
            console.log(`selected ID is empty string`);
            return;
        }

        for (let marker of markers){
            console.log(markers.props.id);
            if (marker.props.id === selectedID){
                return marker;
            }
        }
    }

    createAttractionMarker(attraction) {
        return <Marker
            key={attraction._id}
            id={attraction._id}
            name={attraction.name}
            start_time={(attraction.start_time) ? formatAMPM(new Date(attraction.start_time.toString())) : 'n/a'}
            end_time={(attraction.end_time) ? formatAMPM(new Date(attraction.end_time.toString())) : 'n/a'}
            price={attraction.free ? 'Free' : ((attraction.price) ? '$'.concat(attraction.price.toString()) : 'n/a')}
            location={attraction.location.display_address[0]}
            link={attraction.link}
            position={{
                lat: attraction.latitude,
                lng: attraction.longitude
            }}
            icon={{
                url: "https://img.icons8.com/color/43/000000/compact-camera.png"
            }}
            description={(attraction.description) ? attraction.description : 'No Description Available'}
            onClick={this.props.handleOnMarkerClick}
            visible={true}
        />
    }

    createEventMarker(event) {
        return <Marker
            key={event._id}
            id={event._id}
            name={event.name}
            start_time={(event.start_time) ? formatAMPM(new Date(event.start_time)) : 'n/a'}
            end_time={(event.end_time) ? formatAMPM(new Date(event.end_time)) : 'n/a'}
            price={event.free ? 'Free' : ((event.price) ? '$'.concat(event.price.toString()) : 'n/a')}
            location={event.location.display_address[0]}
            link={event.link}
            position={{
                lat: event.latitude,
                lng: event.longitude
            }}
            description={event.description}
            onClick={this.props.handleOnMarkerClick}
            visible={true}
        />
    }

    // EFFECTS: render markers based on currentEvents Collection
    displayMarkers = () => {
        let currentEvents = this.props.currentEvents;
        let filteredItems = currentEvents.filter((item) => this.filterItems(item));
        let markers = filteredItems.map((item) => {
            if (item.type === 'Attraction') {
                return this.createAttractionMarker(item);
            } else {
                return this.createEventMarker(item);
            }
        });
        return markers;
    };

    // EFFECTS: return true if the item meets one of the selected categories and is within the price range
    //          return false if user decides not to show nearby attraction and this item is an attraction
    //
    //          If no category selected, items of all categories are considered
    //          If a category has been selected and the item price is within the price range, it may be shown
    //          Price range is always in effect.
    filterItems = (item) => {
        let shouldShowAttraction = this.props.homePage.toggleNearbyAttractions;
        let isItemAttraction = item.type === 'Attraction';
        if (!shouldShowAttraction && isItemAttraction) {
            return false;
        }
        let filterCategories = this.props.eventFilter.categories;
        let itemMatchCategory;
        if (filterCategories.length === 0) {
            itemMatchCategory = true;
        } else {
            itemMatchCategory = filterCategories.includes(item.category);
        }
        let withinPriceRange = item.price >= this.props.eventFilter.priceRange[0] &&
            item.price <= this.props.eventFilter.priceRange[1];
        return itemMatchCategory && withinPriceRange;
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
                                                        {this.props.homePage.toggleNearbyAttractions ? 'Hide Attractions' : 'Show Nearby Attractions'}
                                                    </a>
                                                    <a className="item" onClick={this.props.showPanel}>
                                                        <div
                                                            className="ui small label">{this.props.dataReadySaved ? this.props.savedEvents.length : 0}</div>
                                                        Show Current Selection
                                                    </a>
                                                    <Link className="item" to="/edit">
                                                        Plan Your Itinerary
                                                        <Icon className="next-button" name="caret square right"
                                                              size="large"/>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Column>

                                    <Grid.Column width={12}>
                                        <div style={{height: '94vh'}}>
                                            <MapContainer width={'98%'} height={'100%'}
                                                          initialCenter={{lat: 49.2820, lng: -123.1171}}>
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
        visible: state.panel.visible,
        searchBar: state.searchBar
    };
};
const HomePageContainer = withTracker(() => {
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
