// references: https://www.npmjs.com/package/react-calendar
import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { Popup, Icon } from 'semantic-ui-react';
import { changeDate, toggleConfirmWindow, confirm, cancel } from '../../actions/datePickerActions';
import { CalledDates } from '../../../api/CalledDates';
import "./customDatePickerWidth.css";
import { Confirm } from "semantic-ui-react";


class DatePicker extends React.Component {
    // Holding a temporary date in case user selected OK at the ConfirmWindow
    state = { tempDate: null };

    // EFFECTS: user confirmed the window. Will update the currentEvent collection to the new selected date
    handleConfirm = () => {
        this.props.confirm();

        let value = this.state.tempDate;
        this.props.changeDate(value);
        CalledDates.insert({ date: value }); // TODO: Security issue + What happens if date already exists?
        Meteor.call('updateEvents', value);
        Meteor.call('clearDrawer');
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
            CalledDates.insert({date: value});
            Meteor.call('updateEvents', value);
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
                    <Popup
                        className="vango-info"
                        trigger={<Icon className="info circle"/>}
                    >
                        {<div>
                            <p>
                                VanGo is an itinerary planner for locals and tourists who want to discover events and attractions in Vancouver.
                            </p>
                            <p>
                                <b>To begin, select a date!</b>
                            </p>
                        </div>}
                    </Popup>
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
})(DatePicker);
