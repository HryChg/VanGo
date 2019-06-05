import React from 'react';
import {connect} from 'react-redux';

const sideBarStyle = {};


class SideBar extends React.Component {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed2

    render() {
        return (
            <div className="sidebar">
                <p>This is a side bar</p>

                <div className="sidenav">
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(SideBar);
