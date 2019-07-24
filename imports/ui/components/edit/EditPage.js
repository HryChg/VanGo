import React from 'react';
import {connect} from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import {Redirect} from 'react-router-dom';
import {Grid, Icon} from 'semantic-ui-react';
import uniqid from 'uniqid';

import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import {saveItinerary, resetEditPage} from "../../actions/editPageActions";
import {editingItinerary} from "../../actions/itineraryActions";
import {formatAMPM} from "../../../util/util";
import Mailgun from "../../../api/Mailgun";
import EmailForm from "./EmailForm";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";


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
            items = ready? ready.items : [];
        } else {
            items = this.props.draggableItems.items;
        }
        return items;
    }

    // EFFECTS: get date or, if editing, date: name
    getDate = () => {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let date = ready? ready.date : "";
            let name = ready? ready.name : "";
            let header = date || name? date + ": " + name : "";
            return header;
        } else {
            return this.props.datePicker.selectedDate.toDateString();
        }
    };

    // EFFECTS: returns name of itinerary (without the date)
    getName = () => {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let name = ready? ready.name : "";
            return name;
        }
        return "";
    }

    // EFFECTS: renders date or, if editing, date: name
    toggleEditHeader() {
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            let date = ready? ready.date : "";
            let name = ready? ready.name : "";
            let header = date || name? date + ": " + name : "";
            return (<h3>{header}</h3>);
        } else {
            let selectedDateString = this.props.datePicker.selectedDate.toDateString();
            return (<h3>{selectedDateString}</h3>);
        }
    }

    // EFFECTS: changes state of name input
    handleNameChange = (event) => {
        this.setState({nameInput: event.target.value});
    }

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

    // EFFECTS: display markers base on events in draggable items
    displayMarkers = () => {
        let items = this.selectItems();
        let markers = items.map((item) => {
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
                    position={{
                        lat: item.latitude,
                        lng: item.longitude
                    }}
                    icon={{
                        url: "https://img.icons8.com/color/43/000000/compact-camera.png"
                    }}
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
                    position={{
                        lat: item.latitude,
                        lng: item.longitude
                    }}
                    description={item.description}
                    onClick={this.props.handleOnMarkerClick}/>
            }
        });
        return markers;
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
    };

    toggleEmailForm = () => {
        if (!Meteor.user()) {
            return (
                <div className="ui message">
                    <div className="header">Warning</div>
                    <p>Please log in before sharing your itinerary.</p>
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
                                        <button className="ui button"
                                                onClick={() => {
                                                    this.createItinerary();
                                                }}>
                                            <Icon name="heart"/>
                                            Save
                                        </button>
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
                            <div style={{height: '100vh'}}>
                                <MapContainer width={'98%'} height={'100%'}>
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
        editing: state.itineraryStore.editing
    };
};

export default connect(mapStateToProps, {
    handleOnMarkerClick: handleOnMarkerClick,
    saveItinerary: saveItinerary,
    resetEditPage: resetEditPage,
    editingItinerary: editingItinerary
})(EditPage);
