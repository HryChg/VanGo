// references: https://www.npmjs.com/package/react-calendar
import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import {changeDate, toggleConfirmWindow, confirm, cancel} from '../../actions/datePickerActions';
import {CalledDates} from '../../../api/CalledDates';
import "./customDatePickerWidth.css";
import {Confirm} from "semantic-ui-react";


class DatePicker extends React.Component {


    handleConfirm = () => {
        this.props.confirm();
    };

    handleCancel = () => {
        this.props.cancel();
    };

    // update selected date in store
    onChange = value => {
        this.props.toggleConfirmWindow();
        this.props.changeDate(value);
        CalledDates.insert({date: value});
        Meteor.call('updateEvents', value);
    };

    render() {
        return (
            <div className="customDatePickerWidth">
                <Confirm open={this.props.openConfirmWindow}
                         onCancel={this.handleConfirm}
                         onConfirm={this.handleCancel}/>
                <h3>Current Selection: {this.props.selectedDate.toDateString()}</h3>
                <Calendar
                    onChange={this.onChange}
                    value={this.props.selectedDate}
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
