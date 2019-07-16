import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import {changeDate} from '../../actions/datePickerActions'

class DatePicker extends React.Component {
    // references: https://www.npmjs.com/package/react-calendar
    constructor(props){
        super(props);
    }

    // update selected date in store
    onChange = value => {
        this.props.changeDate(value);
        Meteor.call('updateEvents', value);
    };

    render() {
        return (
            <div>
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
