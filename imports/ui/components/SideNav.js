// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed2
import React from 'react';

class SideNav extends React.Component {
    render() {
        return (
            <div className="sidenav">
                {this.props.children}
            </div>
        );
    }
}
export default SideNav;
