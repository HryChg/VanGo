import React from 'react';
import { connect } from 'react-redux';
import { Marker } from "google-maps-react";
import { Link, Redirect, NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Sidebar, Menu, Icon, Button } from 'semantic-ui-react';

import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import { handleOnMarkerClick, popUpInfoWindow } from "../../actions/mapContainerActions";
import { toggleNearbyAttractions } from "../../actions/homePageActions";
import { showPanel, hidePanel } from './../../actions/panelActions';
import { containOneOf, formatAMPM } from "../../../util/util";
import CurrentEvents from '../../../api/CurrentEvents';
import EventDrawerApi from "../../../api/EventDrawerApi";
import { VanGoStore } from "../../../../client/main";


class HomePage extends React.Component {

    // EFFECTS: return index of the marker component if it matches the selected ID from searchBar reducer
    //          return undefined if no match found
    filterMarkersOnSearch(markers) {
        let selectedID = this.props.searchBar.selected;
        if (selectedID === '') {
            return;
        }
        for (let idx = 0; idx < markers.length; idx++) {
            let marker = markers[idx];
            if (marker.props.id === selectedID) {
                return idx;
            }
        }
    }

    // EFFECTS: create a marker based on an attraction
    //          Set marker to invisible if user choose to hide attractions
    //              or the attraction did not pass event filter (this.showMarker())
    createAttractionMarker(attraction) {
        let showAttraction = this.props.homePage.toggleNearbyAttractions;
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
            visible={showAttraction && this.showMarker(attraction)}
        />
    }

    // EFFECTS: create a marker based on an event
    //          Set marker to invisible if the event did not pass event filter (this.showMarker())
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
            visible={this.showMarker(event)}
        />
    }

    // EFFECTS: render markers based on currentEvents Collection
    displayMarkers = () => {
        let markers = this.props.currentEvents.map((item) => {
            // if (VanGoStore.getState().datePicker.selectedDate) {
                if (item.type === 'Attraction') {
                    return this.createAttractionMarker(item);
                } else {
                    return this.createEventMarker(item);
                }
            // }
        });
        // console.log(`there are a total of ${markers.length} markers`);

        // TODO Search Thru Marker to find a one that matches the search bar
        let searchedMarkerIdx = this.filterMarkersOnSearch(markers);
        if (searchedMarkerIdx) {
            this.modifyMarker(markers, searchedMarkerIdx);

            // TODO: does not work here. Invariant Violation: Maximum update depth
            // this.props.handleOnMarkerClick(markers[searchedMarkerIdx].props, markers[searchedMarkerIdx].marker);
            // let temp = markers[searchedMarkerIdx];
            // this.props.popUpInfoWindow(temp.props, temp);
        }

        return markers;
    };

    // Trigger an action once a marker is mounted on the map
    onMarkerMounted = element => {
        // TODO ERROR Cannot read property 'props' of null
        console.log(element);

        if (element){
            // https://stackoverflow.com/questions/54555963/googlemaps-react-open-infowindow-by-default-not-from-onclick
            console.log(element);
            this.props.handleOnMarkerClick(element.props, element.marker);
            // Kind of working. Only able to show the content if it is already open
        }
    };

    // EFFECTS: given an index, modify the corresponding marker so that it is set to visible again
    // MODIFIES: markers (i.e. the marker at the idx)
    // NOTE: each element in markers are read only objects,
    //          therefore a new object is produced to replace the original
    modifyMarker(markers, idx) {
        let oldMarker = markers[idx];
        let copied = Object.assign({}, oldMarker.props); // copy the read-only object, extract only the property of the react component
        copied.visible = true; // set the new marker's property to include true
        let newMarker = (<Marker
            ref={this.onMarkerMounted}
            key={copied.id}
            {...copied}
        />);
        markers[idx] = newMarker;
    }

    // EFFECTS: return true if the item meets one of the selected categories and is within the price range
    //          If no category selected, items of all categories are considered
    //          If a category has been selected and the item price is within the price range, it may be shown
    //          Price range is always in effect.
    showMarker = (item) => {
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
                        <EventDrawer />
                    </Sidebar>

                    <Sidebar.Pusher>
                        <div>
                            <Grid stackable divided='vertically'>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={4}>
                                        <div className={"home-panel"}>
                                            <h2>
                                                <Icon className="logo" name="street view" />
                                                VanGo
                                            </h2>
                                            <div className={"SearchBarContainer"}>
                                                <SearchBar />
                                            </div>
                                            <div className={"DatePickerContainer"}>
                                                <DatePicker />
                                            </div>
                                            <div className={"EventFilterContainer"}>
                                                <EventFilter events={this.props.currentEvents} />
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
                                                </div>
                                            </div>

                                            <Button className="redirect-to-itinerary blue" as={NavLink} to="/edit/">
                                                Next
                                            </Button>
                                        </div>
                                    </Grid.Column>

                                    <Grid.Column width={12}>
                                        <div style={{ height: '94vh' }}>
                                            <MapContainer width={'98%'} height={'100%'}
                                                initialCenter={{ lat: 49.2820, lng: -123.1171 }}>
                                                {this.displayMarkers()}
                                                <Marker
                                                    ref={this.props.handleOnMarkerClick}
                                                    key={'000'}
                                                    name={'UBC Marker'}
                                                    start_time={'n/a'}
                                                    end_time={'n/a'}
                                                    price={'n/a'}
                                                    location={'dddddddd'}
                                                    link={''}
                                                    position={{
                                                        lat: 49.2606,
                                                        lng: -123.2460
                                                    }}
                                                    description={'This is UBC'}
                                                    onClick={this.props.handleOnMarkerClick}
                                                    visible={true}
                                                />
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
        searchBar: state.searchBar,
        mapContainer: state.mapContainer
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
    hidePanel,
    popUpInfoWindow
})(HomePageContainer);
