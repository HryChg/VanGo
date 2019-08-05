// references: https://www.npmjs.com/package/react-calendar
import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import {Icon} from 'semantic-ui-react';
import { changeDate, toggleConfirmWindow, confirm, cancel } from '../../actions/datePickerActions';
import {updateToCurrentEvents} from './../../actions/currentEventsActions';
import {clearDrawerState} from './../../actions/draggableItemsActions';
import { CalledDates } from '../../../api/CalledDates';
import "./customDatePickerWidth.css";
import { Confirm } from "semantic-ui-react";
import {showDimmer} from "../../actions/homePageActions";


class DatePicker extends React.PureComponent {
    // Holding a temporary date in case user selected OK at the ConfirmWindow
    state = { tempDate: null };

    // EFFECTS: user confirmed the window. Will update the currentEvent collection to the new selected date
    handleConfirm = () => {
        this.props.confirm();

        let value = this.state.tempDate;
        this.props.changeDate(value);
        this.props.updateToCurrentEvents(value);
        Meteor.call('clearDrawer', value, (err, res) => {
            if (err) console.log(err);
            this.props.clearDrawerState(value);
        });
        Meteor.call('updateDrawerDate', value);
    };

    // EFFECTS: user canceled to the window. Nothing Changed.
    handleCancel = () => {
        this.props.cancel();
    };

    // EFFECTS: given the date value from the Calendar, pop up the confirm window
    //          while recording a temporary date for later use (in case user confirm to the window)
    onChange = value => {
        if (this.props.eventDrawerCount) {
            this.props.toggleConfirmWindow();
            this.setState({tempDate: value});
            return;
        } else {
            this.setState({tempDate: value});
            this.props.changeDate(value);
            Meteor.call('updateDrawerDate', value);
            CalledDates.insert({date: value});
            this.props.updateToCurrentEvents(value);
        }
    };

    render() {
        return (
            <div className="customDatePickerWidth">
                <Confirm open={this.props.openConfirmWindow}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                    content={"Choosing a new date will clear out your saved markers for the current date. Are you sure?"} />
                <h3>
                    {"Current Selection: " + this.props.selectedDate.toDateString()}
                    <Icon id={"info-btn"} className="question circle outline" onClick={this.props.showDimmer} floated={"right"}/>
                </h3>
                <Calendar
                    className={"react-calendar__tile--active"}
                    onChange={this.onChange}
                    value={this.props.selectedDate}
                    minDate={new Date()}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: state.datePicker.selectedDate,
        openConfirmWindow: state.datePicker.openConfirmWindow
    };
};

export default connect(mapStateToProps, {
    changeDate,
    toggleConfirmWindow,
    confirm,
    cancel,
    updateToCurrentEvents,
    clearDrawerState,
    showDimmer
})(DatePicker);
