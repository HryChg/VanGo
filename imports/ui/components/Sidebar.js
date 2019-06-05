import React from 'react';
import { connect } from 'react-redux';

class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <p>This is a side bar</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(SideBar);
