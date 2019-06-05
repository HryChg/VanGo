import React from 'react';
import {connect} from 'react-redux';

class SideNav extends React.Component {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed2

    render() {
        return (
            <div className="sidenav">
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(SideNav);
