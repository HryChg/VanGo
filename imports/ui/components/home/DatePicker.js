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
    };


    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.props.selectedDate.date}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {selectedDate: state.selectedDate};
};

export default connect(mapStateToProps, {changeDate})(DatePicker);
