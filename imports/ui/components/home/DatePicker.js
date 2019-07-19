import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import {changeDate} from '../../actions/datePickerActions';
import {CalledDates} from '../../../api/CalledDates';
import "./customDatePickerWidth.css";

class DatePicker extends React.Component {
    // references: https://www.npmjs.com/package/react-calendar
    constructor(props){
        super(props);
    }

    // update selected date in store
    onChange = value => {
        this.props.changeDate(value);
        CalledDates.insert({date: value});
        Meteor.call('updateEvents', value);
    };

    render() {
        return (
            <div className="customDatePickerWidth">
                <Calendar
                    onChange={this.onChange}
                    value={this.props.datePicker.selectedDate}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {datePicker: state.datePicker};
};

export default connect(mapStateToProps, {changeDate})(DatePicker);
