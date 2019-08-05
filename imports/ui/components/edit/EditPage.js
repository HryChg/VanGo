import React from 'react';
import {connect} from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import {Redirect} from 'react-router-dom';
import {Grid, Icon, Popup} from 'semantic-ui-react';
import uniqid from 'uniqid';

import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {saveItinerary, resetEditPage} from "../../actions/editPageActions";
import {selectID, editingItinerary} from "../../actions/itineraryActions";
import {formatAMPM} from "../../../util/util";
import Mailgun from "../../../api/Mailgun";
import EmailForm from "./EmailForm";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import {downloadPdf} from './ItineraryPdf';


class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: this.getName()
        }
    }

    componentWillUnmount() {
        this.props.editingItinerary(false);
        this.props.resetEditPage();
    }

    // EFFECTS: if editing returns selected itinerary items, otherwise returns unsaved items
    selectItems() {
        let items;
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            items = ready ? ready.items : [];
        } else {
            items = this.props.draggableItems.items;
        }
        return items;
    }

    // EFFECTS: get date or, if editing, date: name
    getDate = () => {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let date = ready ? ready.date : "";
            let name = ready ? ready.name : "";
            let header = date || name ? date + ": " + name : "";
            return header;
        } else {
            return this.props.datePicker.selectedDate.toDateString();
        }
    };

    // EFFECTS: returns name of itinerary (without the date)
    getName = () => {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let name = ready ? ready.name : "";
            return name;
        }
        return "";
    }

    // EFFECTS: renders date or, if editing, date: name
    toggleEditHeader() {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let date = ready ? ready.date : "";
            let name = ready ? ready.name : "";
            let header = date || name ? date + ": " + name : "";
            return (<h3>{header}</h3>);
        } else {
            let selectedDateString = this.props.datePicker.selectedDate.toDateString();
            return (<h3>{selectedDateString}</h3>);
        }
    }

    // EFFECTS: renders save button; disabled when user is not logged in
    toggleSaveButton() {
        if (Meteor.userId()) {
            return (
                <button className="ui blue button" onClick={() => { this.createItinerary();}}>
                    <Icon name="heart"/>
                    Save
                </button>)
        } else {
            return (
                <Popup
                    content='Please login to save.'
                    trigger={<button className="ui button">
                        <Icon name="heart"/>
                        Save
                    </button>}
                />
            )
        }
    }

    // EFFECTS: changes state of name input
    handleNameChange = (event) => {
        this.setState({nameInput: event.target.value});
    };

    // EFFECTS: renders field to save name
    //          if editing, renders field as rename with default value itinerary name
    toggleNameInput() {
        if (this.props.editing) {
            return (<input className={"edit-page-path-name"}
                           type="text"
                           placeholder={"Give it a name..."}
                           value={this.state.nameInput}
                           onChange={this.handleNameChange}
            />);
        } else {
            return (<input className={"edit-page-path-name"}
                           type="text"
                           placeholder={"Give it a name..."}
            />);
        }
    }

    // EFFECTS: given the parameter, determine the icon for the marker at idx position
    assignIconImage = (idx, type, listSize) => {
        let size = 48;
        if (!this.props.mapLoaded) {
            return {url: `https://img.icons8.com/color/${size}/000000/marker.png`}
        }


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

    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let items = this.selectItems();
        let size = items.length;

        let markers = items.map((item, index) => {
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
                    icon={this.assignIconImage(index, "Attraction", size)}
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
                    icon={this.assignIconImage(index, "Event", size)}
                    description={item.description}
                    onClick={this.props.handleOnMarkerClick}/>
            }
        });
        return markers;
    };

    makeBounds = () => {
        if (this.props.mapLoaded) {
            let bounds = new google.maps.LatLngBounds();
            let points = this.selectItems().map((item) => {
                return {lat: item.latitude, lng: item.longitude};
            });
            for (let i = 0; i < points.length; i++) {
                bounds.extend(points[i]);
            }
            return bounds;
        }
        return null;
    };

    // EFFECTS: display path based on the order of events in DraggableItems
    displayPolyLine = () => {
        let items = this.selectItems();
        let coordinates = items.map((item, index) => {
            return {lat: item.latitude, lng: item.longitude};
        });

        return (<Polyline
            path={coordinates}
            strokeColor={"#3F84CA"}
            strokeOpacity={1}
            strokeWeight={5}
        />);
    };

    // EFFECTS: create a path containing id, name, date, and events
    createItinerary = () => {
        let itineraryName = document.querySelector(".edit-page-path-name").value;
        if (itineraryName === '') {
            alert("Please enter a name for this Itinerary");
            return null;
        }
        let items = this.selectItems();
        let itin = {
            _id: this.props.editing ? this.props.draggableItems.itineraryEdit._id : uniqid(),
            name: itineraryName,
            date: this.props.datePicker.selectedDate.toDateString(),
            items: items
        };

        console.log(itin);
        this.props.saveItinerary(itin, this.props.editing);
        this.props.selectID(itin._id);
    };

    toggleEmailForm = () => {
        if (!Meteor.user()) {
            return (
                <div className="ui message">
                    <div className="header">Notice</div>
                    <p>To share your itinerary via email, please log in.</p>
                    <button className="ui button"
                            onClick={() => downloadPdf(this.getDate(), this.selectItems())}>Download Itinerary
                    </button>
                </div>
            )
        }
        return (<EmailForm
            items={this.selectItems()}
            userEmail={(Meteor.user()) ? Meteor.user().emails[0].address : 'Meteor Loading'}
            userName={(Meteor.user()) ? Meteor.user().profile.name : 'Meteor Loading'}
            date={this.getDate()}
        />);
    };

    render() {
        if (this.props.saved) {
            return (<Redirect exact to='/itinerary'/>);
        } else {
            return (
                <Grid stackable divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column width={4}>
                            <div className={"edit-panel"}>
                                <h2 className={"ui header"}>Reorder Itinerary</h2>
                                {this.toggleEditHeader()}
                                <DraggableItems/>
                                <div className={"container"}>
                                    <div className="ui action input mini fluid">
                                        {this.toggleNameInput()}
                                        {this.toggleSaveButton()}
                                    </div>
                                </div>
                                <div className={"container"}>
                                    <Divider/>
                                    <h3>Share Your Itinerary</h3>
                                    {this.toggleEmailForm()}
                                </div>
                            </div>
                        </Grid.Column>

                        <Grid.Column width={12}>
                            <div style={{height: '94vh'}}>
                                <MapContainer width={'98%'}
                                              height={'100%'}
                                              setBounds={true}
                                              bounds={this.makeBounds()}>
                                    {this.displayMarkers()}
                                    {this.displayPolyLine()}
                                </MapContainer>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        draggableItems: state.draggableItems,
        datePicker: state.datePicker,
        saved: state.draggableItems.saved,
        editing: state.itineraryStore.editing,
        mapLoaded: state.mapContainer.mapLoaded
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick,
    saveItinerary: saveItinerary,
    resetEditPage: resetEditPage,
    editingItinerary: editingItinerary,
    selectID: selectID
})(EditPage);
