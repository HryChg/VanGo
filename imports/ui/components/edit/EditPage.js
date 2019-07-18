import React from 'react';
import {connect} from 'react-redux';
import {Marker, Polyline} from "google-maps-react";
import { Redirect } from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react';
import uniqid from 'uniqid';

import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import {handleOnMarkerClick} from "../../actions/mapContainerActions";
import { saveItinerary, resetEditPage } from "../../actions/editPageActions";
import { editingItinerary } from "../../actions/itineraryActions";
import {getEventDrawer} from "../../actions/draggableItemsActions";
import { formatAMPM } from "../../../util/util";


class EditPage extends React.Component {
    componentWillMount() {
        this.props.getEventDrawer();
    }

    componentWillUnmount() {
        this.props.resetEditPage();
        this.props.editingItinerary(false);
    }

    // EFFECTS: if editing returns selected itinerary items, otherwise returns unsaved items
    selectItems() {
        let items;
        if (this.props.editing) {
            items = this.props.draggableItems.itineraryEdit.items;
        } else {
            items = this.props.draggableItems.items;
        }
        return items;
    }

    // EFFECCTS: renders date or, if editing, date: name
    toggleEditHeader() {
        if (this.props.editing) {
            let date = this.props.draggableItems.itineraryEdit.date;
            let name = this.props.draggableItems.itineraryEdit.name;
            return (<h3>{date + ": " + name}</h3>)
        } else {
            let selectedDateString = this.props.datePicker.selectedDate.toDateString();
            return (<h3>{selectedDateString}</h3>);
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
    // TODO Will have to send this to server in the future
    createItinerary = () => {
        let itineraryName = document.querySelector(".edit-page-path-name").value;
        if (itineraryName === ''){
            alert("Please enter a name for this Itinerary");
            return null;
        }
        let items = this.selectItems();
        let itin = {
            _id: this.props.editing? this.props.draggableItems.itineraryEdit._id : uniqid(),
            name: itineraryName,
            date: this.props.datePicker.selectedDate.toDateString(), // TODO: Convert to uniform format
            items: items
        };

        console.log(itin);
        this.props.saveItinerary(itin, this.props.editing);
    };

    shareItinerary = () => {
        console.log('sharing this itinerary...');
        let items = this.selectItems();
        let userEmail = Meteor.user().emails[0].address;
        let userName = Meteor.user().profile.name;
        let date = this.toggleEditHeader(); // TODO Fix This

        console.log({
            userEmail,
            userName,
            date,
            items,
        })

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
                                            <input className={"edit-page-path-name"} type="text" placeholder={"Give it a name..."}/>
                                            <button className="ui button" onClick={() => {
                                                this.createItinerary();
                                                }}>
                                                <Icon name="heart"/>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                    <div className={"container"}>
                                        <button className="ui button fluid" onClick={this.shareItinerary}>
                                            <Icon name="envelope outline"/>
                                            Email
                                        </button>
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
    editingItinerary: editingItinerary,
    getEventDrawer: getEventDrawer
})(EditPage);
