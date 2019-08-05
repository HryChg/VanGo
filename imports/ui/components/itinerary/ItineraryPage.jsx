//Reference: https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

import React from 'react';
import { connect } from 'react-redux';
import { Marker, Polyline } from "google-maps-react";
import { Redirect } from 'react-router-dom';
import { Grid, Icon, Menu, Sidebar, Button } from 'semantic-ui-react';
import { handleOnMarkerClick } from "../../actions/mapContainerActions";
import { Meteor } from 'meteor/meteor';
import debounceRender from 'react-debounce-render';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

import { updateMapCenter } from './../../actions/mapContainerActions';
import { selectID, editingItinerary, loadItineraries, loadItineraryToDrawer } from './../../actions/itineraryActions';
import { showPanel, hidePanel } from './../../actions/panelActions';
import { formatAMPM, sortByDateName, getToday, getLatLonCenterOfEvents } from "../../../util/util";
import EmailForm from "./../edit/EmailForm";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import { downloadPdf } from '../edit/ItineraryPdf';
import { isString } from 'util';


class ItineraryPage extends React.Component {
    componentWillMount() {
        Meteor.call('fetchItineraries', (err, res) => {
            if (err) console.log(err);
            this.props.loadItineraries(res);
            this.initializeSelectedID(res);
            this.getSelectedLatLonCenter();
        });
    }

    // EFFECTS: initializes selectedID with first future itinerary, else last itinerary
    initializeSelectedID(itineraries) {
        if (!Array.isArray(itineraries) || !itineraries.length) {
            return "";
        }
        let sorted = sortByDateName(itineraries);
        if (this.props.selectedID === "") {
            let today = getToday();
            for (let x in sorted) {
                let itineraryDate = new Date(sorted[x].date);
                if (itineraryDate.getTime() >= today.getTime()) {
                    this.props.selectID(sorted[x]._id);
                    return;
                }
            }
            this.props.selectID(sorted[sorted.length - 1]._id);
            return;
        }
    }

    // EFFECTS: returns itinerary with the selectedID
    //          if no itineraries, return null
    //          if no selectedID, choose:
    //               - first future itinerary
    //               - if none, choose most recent itinerary
    //          if selectedID given, return itinerary if it exsits
    getSelectedItinerary(selectedID) {
        if (!Array.isArray(this.props.itineraries) || !this.props.itineraries.length) {
            return null;
        } else {
            let itineraries = sortByDateName(this.props.itineraries);
            if (selectedID === "") {
                this.initializeSelectedID(itineraries);
            } else {
                for (let x in itineraries) {
                    if (itineraries[x]._id === selectedID) {
                        return itineraries[x];
                    }
                }
            }
        }
        return null;
    }

    // EFFECTS: returns date of itinerary given the id
    //          if not found, return empty string
    getDateFromID(id) {
        let itineraries = this.props.itineraries;
        for (let x in itineraries) {
            if (itineraries[x]._id === id) {
                return new Date(itineraries[x].date);
            }
        }
        return "";
    }

    // EFFECTS: returns displayName based on selectedID
    //          if no selected ID, choose:
    //               - the first future itinerary
    //               - otherwise, choose last
    getDisplayName(selectedID) {
        let itinerary = this.getSelectedItinerary(selectedID);
        if (itinerary) {
            let date = isString(itinerary.date) ? itinerary.date : itinerary.date.toDateString();
            return itinerary.name ? date + ': ' + itinerary.name : date;
        }
        return "";
    }

    // TODO: How do I get this method called between clicking the button in datepanel and here?
    // EFFECTS: retrieves selected itinerary, finds the center lat and lon, updates state, returning the center
    getSelectedLatLonCenter() {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (!selectedItinerary) return null;
        let center = getLatLonCenterOfEvents(selectedItinerary.items);
        if (center) {
            this.props.updateMapCenter(center);
            return center;
        }
        return null;
    }

    // EFFECTS: renders edit button when itinerary date is not in the past
    displayEditButton() {
        let today = getToday();
        let itineraryDate = this.getDateFromID(this.props.selectedID);
        if (itineraryDate) {
            if (itineraryDate.getTime() >= today.getTime()) {
                return (
                    <Button className="it-edit" onClick={() => {
                        this.props.loadItineraryToDrawer(this.props.selectedID);
                    }}>
                        <Icon name={"pencil"} size={"large"} color={"black"}/>
                    </Button>
                );
            }
        }
    }

    // EFFECTS: given the parameter, determine the icon for the marker at idx position
    assignIconImage = (idx, type, listSize) => {
        let size = 48;
        // if (!this.props.mapLoaded){
        //     return {url: `https://img.icons8.com/color/${size}/000000/marker.png`}
        // }


        let image;
        if (idx === 0) { // start flag
            image = {
                url: `https://img.icons8.com/color/${size}/000000/filled-flag.png`,
                size: new google.maps.Size(size, size),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(size / 3, size)
            };
        } else if (idx === listSize - 1) { // end flag
            image = {
                url: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg3dw3XQE0AAAADnRSTlMAHry7uh/yvly9UPTz/diodF0AAABHSURBVDjLY2CgJmDVNsQuwfTuCXYJnnfPsEsw49LBOrcQh+3rGnBI/P///927d8jkYJBAEwWSg0FiNKxIkHiAI8GNStAKAAB2D73brPu5/AAAAABJRU5ErkJggg==`,
                size: new google.maps.Size(size, size),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, size)
            };
        } else if (type === "Attraction") {
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

    // EFFECTS: display markers base on items in draggable items
    displayMarkers = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let listSize = selectedItinerary.items.length;
            let markers = selectedItinerary.items.map((item, index) => {
                if (item.type === 'Attraction') {
                    return <Marker
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        start_time={(item.start_time) ? formatAMPM(new Date(item.start_time.toString())) : 'n/a'}
                        end_time={(item.end_time) ? formatAMPM(new Date(item.end_time.toString())) : 'n/a'}
                        price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                        location={item.location.display_address[0]}
                        link={item.link}
                        position={{lat: item.latitude, lng: item.longitude}}
                        icon={this.assignIconImage(index, "Attraction", listSize)}
                        description={(item.description) ? item.description : 'No Description Available'}
                        onClick={this.props.handleOnMarkerClick}/>
                } else {
                    return <Marker
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        start_time={(item.start_time) ? formatAMPM(new Date(item.start_time)) : 'n/a'}
                        end_time={(item.end_time) ? formatAMPM(new Date(item.end_time)) : 'n/a'}
                        price={item.free ? 'Free' : ((item.price) ? '$'.concat(item.price.toString()) : 'n/a')}
                        location={item.location.display_address[0]}
                        link={item.link}
                        position={{lat: item.latitude, lng: item.longitude}}
                        icon={this.assignIconImage(index, "Event", listSize)}
                        description={item.description}
                        onClick={this.props.handleOnMarkerClick}/>
                }
            });
            return markers;
        }
        return null;
    };

    makeBounds = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary && this.props.mapLoaded) {
            if(selectedItinerary.items.length === 0){
                return null;
            }

            let bounds = new google.maps.LatLngBounds();
            let points = selectedItinerary.items.map((item) => {
                return {lat: item.latitude, lng: item.longitude};
            });
            for (let i = 0; i < points.length; i++){
                bounds.extend(points[i]);
            }
            return bounds;
        }
        return null;
    };

    // EFFECTS: display path based on the order of items in DraggableItems
    displayPolyLine = () => {
        let selectedItinerary = this.getSelectedItinerary(this.props.selectedID);
        if (selectedItinerary) {
            let coordinates = selectedItinerary.items.map((item, index) => {
                return {lat: item.latitude, lng: item.longitude};
            });

            return (<Polyline
                path={coordinates}
                strokeColor={"#3F84CA"}
                strokeOpacity={1}
                strokeWeight={5}
            />);
        }
        return null;
    };

    toggleEmailForm = () => {
        if (this.getSelectedItinerary(this.props.selectedID)) {
            return (
                <div className={"container column"}>
                    <Divider />
                    <div className={"emailFormItin"}>
                        <h3>Share Your Itinerary</h3>
                        <EmailForm
                            items={this.getSelectedItinerary(this.props.selectedID) ?
                                this.getSelectedItinerary(this.props.selectedID).items : null}
                            userEmail={(Meteor.user()) ? Meteor.user().emails[0].address : 'Meteor Loading'}
                            userName={(Meteor.user()) ? Meteor.user().profile.name : 'Meteor Loading'}
                            date={this.getDateFromID(this.props.selectedID) ?
                                this.getDateFromID(this.props.selectedID).toDateString() : null} />
                        <p style={{ textAlign: "center" }}> <br /> Or</p>
                        <button className="ui button fluid" onClick={() =>
                            downloadPdf(this.getDisplayName(this.props.selectedID),
                                this.getSelectedItinerary(this.props.selectedID).items)}>
                                    <i className="download icon"></i>
                                    Download Itinerary</button>
                    </div>
                </div>
            );
        }
    };

    // EFFECTS: If itinerary is being edited, redirect to home page; otherwise, display itinerary page
    render() {
        if (this.props.editing) {
            return (<Redirect exact to='/itinerary/edit/'/>);
        }
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='left'
                        icon='labeled'
                        inverted
                        onHide={this.props.hidePanel}
                        vertical
                        visible={this.props.visible}
                    >
                        <ItineraryDatePanel itineraries={this.props.itineraries}><h2>Itineraries</h2>
                        </ItineraryDatePanel>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Grid stackable divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column className="itinPageScroll">
                                    <div className="ui grid">
                                        <div id="it-date-toggle">
                                            <Menu inverted attached icon>
                                                <Menu.Item
                                                    onClick={this.props.showPanel}>
                                                    <Icon name="calendar" />
                                                </Menu.Item>
                                            </Menu>
                                        </div>
                                        <div id="itinerary-name">
                                            <h1>
                                                <div className="it-header column">{this.getDisplayName(this.props.selectedID)}</div>
                                                {this.displayEditButton()}
                                            </h1>
                                        </div>
                                    </div>
                                    <div id="it-list">
                                        <ItineraryList itinerary={this.getSelectedItinerary(this.props.selectedID)}/>
                                    </div>
                                    {this.toggleEmailForm()}
                                </Grid.Column>

                                <Grid.Column>
                                    <div
                                        style={{width: '50vw', height: '100vh'}}
                                    >
                                        <MapContainer
                                            width={'97.5%'}
                                            height={'101.5%'}
                                            center={this.props.currentCenter}
                                            setBounds={true}
                                            bounds={this.makeBounds()}
                                            ignore={this.props.visible}
                                        >
                                            {this.displayMarkers()}
                                            {this.displayPolyLine()}
                                        </MapContainer>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const debouncedItineraryPage = debounceRender(ItineraryPage, 100, {leading: false, trailing: true});

const mapStateToProps = (state) => {
    return {
        selectedID: state.itineraryStore.selectedID,
        selectedItinerary: state.itineraryStore.selectedItinerary,
        editing: state.itineraryStore.editing,
        visible: state.panel.visible,
        itineraries: state.itineraryStore.itineraries,
        mapLoaded: state.mapContainer.mapLoaded,
        currentCenter: state.mapContainer.currentCenter
    };
}

export default connect(mapStateToProps,
    { handleOnMarkerClick,
        selectID,
        editingItinerary,
        showPanel,
        hidePanel,
        loadItineraries,
        updateMapCenter,
        loadItineraryToDrawer
    }
)(debouncedItineraryPage);
