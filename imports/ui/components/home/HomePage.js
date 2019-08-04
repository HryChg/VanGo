// Reference: https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering/41005168

import React from 'react';
import {connect} from 'react-redux';
import {Marker} from "google-maps-react";
import {NavLink} from 'react-router-dom';
import {Button, Dimmer, Grid, Menu, Sidebar, Icon, Label, Header} from 'semantic-ui-react';

import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {loadCurrentEvents} from './../../actions/currentEventsActions';
import {filterPrice} from "../../actions/eventFilterActions";
import {showPanel, hidePanel} from './../../actions/panelActions';
import {toggleNearbyAttractions, hideDimmer, showDimmer} from "../../actions/homePageActions";
import {formatAMPM, getMaxPrice} from "../../../util/util";

class HomePage extends React.Component {
    // Don't update when date changes as If the date doesn't change, don't update
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selectedDate.getTime() !== this.props.selectedDate.getTime()) {
            return false;
        } else {
            return true;
        }
    }

    componentDidMount() {
        // set default date to today if not editing
        let date;
        if (this.props.editing) {
            date = this.props.selectedDate;
        } else {
            date = new Date();
        }
        Meteor.call('updateEvents', date, (err, res) => {
            if (err) console.log(err);
            this.props.loadCurrentEvents(res);
            this.setMaxPrice(res);
        })    
        if (this.props.editing) {
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
                return (<h2>Add/Remove Itinerary Items from
                    {" " + this.props.eventDrawer.itineraryEdit.date + ": " + this.props.eventDrawer.itineraryEdit.name}
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

    setMaxPrice(events) {
        let maxPrice = getMaxPrice(events);
        this.props.filterPrice([0, maxPrice? maxPrice: 0]);
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
                                    <Grid.Column width={4}>
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
                                                    <Label>{this.displaySelectionCount()}</Label>
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
    loadCurrentEvents,
    filterPrice
})(HomePage);
