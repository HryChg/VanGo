// Reference: https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import { logout, setLoginState } from '../actions/userActions.js';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { Menu, Icon } from 'semantic-ui-react';

import LoginPage from './user/LoginPage'; 
import ItineraryPageContainer from './itinerary/ItineraryPage';
import EditPage from "./edit/EditPage";
import HomePage from "./home/HomePage";
import RegistrationPage from './user/RegistrationPage';

import { editingItinerary } from '../actions/itineraryActions';
import { resetMapCenter } from '../actions/mapContainerActions';

// This part routes to "different pages"
function ProfilePage() {
    return <h2>My Profile</h2>;
}

class AppRouter extends React.Component {
    componentDidMount() {
        this.props.setLoginState(Meteor.userId());
    }

    toggleUserView() {
        if (!this.props.loggedIn) {
            return (
                <Menu.Item as={NavLink} to="/login/">
                    Login
                </Menu.Item>
            );
        } else {
            return (
                <Menu inverted attached>
                    <Menu.Item as={NavLink} to="/itinerary/" onClick={() => {
                        this.props.editingItinerary(false);
                    }}>Saved Itineraries
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/logout/" onClick={() => {
                        this.props.editingItinerary(false);
                        this.props.logout();
                        }}>
                        Logout
                    </Menu.Item>
                </Menu>
            );
        }
    }
    render() {
        return (
            <Router>
                <Menu inverted attached>
                    <Menu.Item as={NavLink} exact to="/" onClick={() => {
                        this.props.editingItinerary(false);
                        this.props.resetMapCenter();
                    }}> 
                        <Icon name="street view"/>
                        VanGo
                    </Menu.Item>
                    {/* <Menu.Item as={NavLink} to="/edit/">Edit</Menu.Item> */}
                    <Menu.Menu position='right'>
                        {this.toggleUserView()}
                    </Menu.Menu>
                </Menu>
                <Route path="/" exact component={HomePage}/>
                <Route path="/profile/" component={ProfilePage}/>
                <Route path="/edit/" component={EditPage}/>
                <Route path="/itinerary/" component={ItineraryPageContainer}/>
                <Route path="/login/" component={LoginPage}/>
                <Route path="/register/" component={RegistrationPage}/>
                <Route path="/logout/" component={HomePage}/>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loggedIn: state.login.loggedIn
    });
}

export default connect(mapStateToProps, { logout, setLoginState, editingItinerary, resetMapCenter })(AppRouter);
