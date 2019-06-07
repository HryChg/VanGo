import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';

class DatePicker extends React.Component {
    // references: https://www.npmjs.com/package/react-calendar

    state = {
        date: new Date()
    };

    // set selected date to the current state
    onChange = date => this.setState({date});

    // get value from calendar
    onClickDay = value => console.log(value);

    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    onClickDay={this.onClickDay}
                    value={this.state.date}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(DatePicker);
