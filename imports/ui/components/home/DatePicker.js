import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import {changeDate} from '../../actions/changeDateActions'

class DatePicker extends React.Component {
    // references: https://www.npmjs.com/package/react-calendar
    constructor(props){
        super(props);
    }

    // set selected date to the current state
    // onChange = date => this.setState({date});
    onChange = value => {
        console.log(value);
        this.props.changeDate(value);
    };

    // get value from calendar
    // show events on Calendar
    onClickDay = value => {
        console.log(value);
        console.log(this);
    };

    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    onClickDay={this.onClickDay}
                    value={this.props.currDate.date} 
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {currDate: state.currDate};
};

export default connect(mapStateToProps, {changeDate})(DatePicker);
