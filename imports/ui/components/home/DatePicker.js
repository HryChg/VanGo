import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { changeDate} from '../../actions/datePickerActions';
import CurrentEvents from '../../../api/CurrentEvents';
import getDayEvents from '../../../api/clientEvents';
import YelpAttractionsApi, { convertBusinessesToAttractions } from "../../../api/YelpAttractionsApi";
import {updateEvents} from "../../../api/CurrentEvents";


class DatePicker extends React.Component {
    // references: https://www.npmjs.com/package/react-calendar
    constructor(props) {
        super(props);
    }

    // update selected date in store, call yelp api for that date & update CurrentEvents db
    onChange = async (value) => {
        this.props.changeDate(value);
        // this.props.updateEvents(await getDayEvents(value));
        updateEvents(value);
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
    return { datePicker: state.datePicker };
};

export default connect(mapStateToProps, { changeDate })(DatePicker);
