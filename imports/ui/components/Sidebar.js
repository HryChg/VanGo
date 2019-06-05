import React from 'react';
import { connect } from 'react-redux';

class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <p> {/* TODO: Fill this in accordingly*/}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SideBar);