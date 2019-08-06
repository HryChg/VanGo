// Reference: https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering/41005168

import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {NavLink} from 'react-router-dom';
import {Button, Dimmer, Grid, Menu, Sidebar, Icon, Label, Header, Image} from 'semantic-ui-react';

import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {clearDrawerState, updateEventDrawer} from '../../actions/draggableItemsActions';
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {showPanel, hidePanel} from './../../actions/panelActions';
import {initializeUser, postLogout} from './../../actions/userActions';
import {toggleNearbyAttractions, hideDimmer, showDimmer} from "../../actions/homePageActions";
import {formatAMPM, getToday, isString, parseDate} from "../../../util/util";

class HomePage extends React.Component {
    // // Don't update when date changes as If the date doesn't change, don't update
    shouldComponentUpdate(nextProps, nextState) {
        let thisDate = isString(this.props.selectedDate) ? parseDate(this.props.selectedDate) : this.props.selectedDate;
        let nextDate = isString(nextProps.selectedDate) ? parseDate(nextProps.selectedDate) : nextProps.selectedDate;
        if (!this.props.editing && nextDate.getTime() !== thisDate.getTime()) {
            return false;
        } else {
            return true;
        }
    }

    componentWillMount() {
        // Date logic:
        // if drawer date is passed, clear drawer and get today's events
        // if drawer date is not the same as selected date, get drawer date's events
        if (this.props.editing) {
            // do nothing
        } else if (this.props.location.pathname === '/logout/') {
            this.props.postLogout();
        } else {
            this.props.initializeUser();
        }

        // When Editing: Show panel
        if (this.props.location.pathname.includes("/itinerary/edit/")) {
            this.props.showPanel();
        }
    }


    // EFFECTS: Debug - Prints which prop was updated
    // componentDidUpdate(prevProps, prevState) {
    //     Object.entries(this.props).forEach(([key, val]) =>
    //       prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    //     );
    // }

    // EFFECTS: renders name and logo; if edit state, renders editing title
    toggleEditHeader() {
        if (this.props.editing) {
            if (this.props.eventDrawer && this.props.eventDrawer.itineraryEdit) {
                let date = this.props.eventDrawer.itineraryEdit.date;
                let dateString = isString(date) ? date : date.toDateString();
                return (<h2>Add/Remove Itinerary Items from
                    {" " + dateString + ": " + this.props.eventDrawer.itineraryEdit.name}
                    </h2>);
            } else {
                return (<h2>Add/Remove Itinerary Items</h2>);
            }
        } else {
            return (<div></div>);
        }
    }

    // EFFECTS: renders datepicker; if edit state, hide datepicker
    toggleDatePicker() {
        if (!this.props.editing) {
            let eventDrawerCount = this.displaySelectionCount();
            return (
                <div className={"DatePickerContainer"}>
                    <Dimmer.Dimmable size={"large"} blurring dimmed={this.props.dimmerActive}>
                        <DatePicker eventDrawerCount={eventDrawerCount}/>
                        <Dimmer active={this.props.dimmerActive} onClickOutside={this.props.hideDimmer}>
                            <Header as='h4' icon inverted>
                                <Icon name='info circle' />
                                VanGo is an itinerary planner for locals and tourists
                                who want to discover events and attractions in Vancouver.
                                <br/><Image src={`https://img.icons8.com/color/${48}/000000/compact-camera.png`} size='mini' verticalAlign='middle' /> <span> Attraction  	&nbsp;	&nbsp;	&nbsp;</span>
                                <Image src={`https://img.icons8.com/color/${48}/000000/marker.png`} size='mini' verticalAlign='middle' /> <span> Event</span>
                            </Header>
                            <Button primary onClick={this.props.hideDimmer}><b>To begin, select a date!</b></Button>
                        </Dimmer>
                    </Dimmer.Dimmable>
                </div>);
        }
    }

    // EFFECTS: renders save button when user is logged in and event drawer has at least one item
    //          otherwise, renders unclickable button
    toggleSaveButton() {
        if (this.displaySelectionCount()) {
            if (this.props.editing) {
                return (<Button fluid className="redirect-to-itinerary blue" as={NavLink} exact to="/itinerary/edit/2/">
                    {"Review & Save"}
                </Button>);
            } else {
                return (<Button fluid className="redirect-to-itinerary blue" as={NavLink} to="/edit/">
                    {"Review & Save"}
                </Button>);
            }
        } else {
            return (<Button fluid disabled className="redirect-to-itinerary" as={NavLink} to="/edit/">
                {"Review & Save"}
            </Button>);
        }
    }

    // // EFFECTS: returns the number of items in the event drawer
    displaySelectionCount() {
        if (this.props.eventDrawer) {
            if (this.props.editing) {
                let drawerEdit = this.props.eventDrawer.itineraryEdit;
                return drawerEdit? drawerEdit.items.length: 0;
            } else {
                return this.props.eventDrawer.items.length;
            }
        } else {
            return 0;
        }
    }


    // EFFECTS: given the parameter, determine the icon for the marker at idx position
    assignIconImage = (type) => {
        let size = 48;
        // if (!this.props.mapContainer.mapLoaded){
        //     return {url: `https://img.icons8.com/color/${size}/000000/marker.png`}
        // }

        let image;
        if (type === "Attraction") {
            image = {
                url: `https://img.icons8.com/color/${size}/000000/compact-camera.png`,
                size: new google.maps.Size(size, size),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, size - 10)
            };
        } else {
            image = {
                url: `https://img.icons8.com/color/${size}/000000/marker.png`,
                size: new google.maps.Size(size, size),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(size / 2, size)
            };
        }
        return image
    };

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
            position={{ lat: attraction.latitude, lng: attraction.longitude }}
            icon={this.assignIconImage('Attraction')}
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
            position={{lat: event.latitude, lng: event.longitude}}
            icon={this.assignIconImage('Event')}
            description={event.description}
            onClick={this.props.handleOnMarkerClick}
            visible={this.showMarker(event)}
        />
    }

    // EFFECTS: render markers based on currentEvents Collection
    displayMarkers = () => {
        if (this.props.currentEvents) {
            let markers = this.props.currentEvents.map((item) => {
                if (item.type === 'Attraction') {
                    return this.createAttractionMarker(item);
                } else {
                    return this.createEventMarker(item);
                }
            });
            return markers;
        }
    };

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
                        <EventDrawer/>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <div>
                            <Grid stackable divided='vertically'>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={4} className={"itinPageScroll"}>
                                        <div className={"home-panel"}>
                                            {this.toggleEditHeader()}
                                            {this.toggleDatePicker()}
                                            <div className={"EventFilterContainer"}>
                                                <EventFilter/>
                                            </div>

                                            <Menu vertical fluid={true}>
                                                <Menu.Item active={this.props.homePage.toggleNearbyAttractions}
                                                           onClick={this.props.toggleNearbyAttractions}>
                                                    {this.props.homePage.toggleNearbyAttractions ? 'Hide Attractions' : 'Show Nearby Attractions'}
                                                </Menu.Item>
                                                <Menu.Item onClick={this.props.visible ? null : this.props.showPanel}>
                                                    <Label color={this.displaySelectionCount() > 0 ? 'blue' : 'grey'}>{this.displaySelectionCount()}</Label>
                                                    Show Current Selection
                                                </Menu.Item>
                                            </Menu>

                                            {this.toggleSaveButton()}
                                        </div>
                                    </Grid.Column>

                                    <Grid.Column width={12}>
                                        <div style={{height: '94vh'}}>
                                            <MapContainer width={'98%'}
                                                          height={'100%'}
                                                          initialCenter={{lat: 49.2820, lng: -123.1171}}
                                                          showSaveButton={true}
                                                          ignore={this.props.visible}
                                                          ignore2={this.props.dimmerActive}
                                                          ignore3={this.props.eventDrawer}
                                                          ignoreException={this.props.eventFilter}
                                                          ignoreException2={this.props.homePage.toggleNearbyAttractions}
                                            >
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

// Function: To reduce the amount of re-render
// To use: Uncomment below and update connect to debouncedHomePage
// const debouncedHomePage = debounceRender(HomePage, 250, {leading: false, trailing: true});

const mapStateToProps = (state) => {
    return {
        homePage: state.homePage,
        dimmerActive: state.homePage.dimmerActive,
        eventFilter: state.eventFilter,
        visible: state.panel.visible,
        mapContainer: state.mapContainer,
        editing: state.itineraryStore.editing,
        selectedDate: state.datePicker.selectedDate,
        currentEvents: state.currentEventsStore.currentEvents,
        eventDrawer: state.draggableItems
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick,
    toggleNearbyAttractions,
    hideDimmer,
    showDimmer,
    showPanel,
    hidePanel,
    clearDrawerState,
    updateEventDrawer,
    initializeUser,
    postLogout
})(HomePage);
