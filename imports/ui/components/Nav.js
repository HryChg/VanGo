// Reference: https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import { Meteor } from 'meteor/meteor';
import {BrowserRouter as Router, NavLink, Redirect, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './user/LoginPage';
import ItineraryPage from './itinerary/ItineraryPage';
import EditPage from "./edit/EditPage";
import HomePage from "./home/HomePage";


// This part routes to "different pages"
// function ProfilePage() {
//     return <h2>My Profile</h2>;
// }

class AppRouter extends React.Component {
    toggleUserView() {
        if (!this.props.loggedIn) {
            console.log("not logged in");
            return (
                <li className="nav-link" id="login-link"><Link to="/login/">Login</Link></li>
            );
        } else {
            console.log("logged in");
            return (
                <li className="nav-link" id="logout-link" onClick={AccountsTemplates.logout()}>
                    <Link to="/logout/">Logout</Link>
                </li>
            );
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul className="nav-bar">
                            <li className="nav-link" id="vango-link"><NavLink to="/">VANGO</NavLink></li>
                            <li className="nav-link" id="edit-link"><NavLink to="/edit/">Edit</NavLink></li>
                            <li className="nav-link" id="itinerary-link"><NavLink to="/itinerary/">Itinerary</NavLink></li>
                            {this.toggleUserView()}
                        </ul>
                    </nav>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/profile/" component={ProfilePage}/>
                    <Route path="/edit/" component={EditPage}/>
                    <Route path="/itinerary/" component={ItineraryPage}/>
                    <Route path="/login/" component={LoginPage}/>
                    <Route path="/logout/" component={HomePage}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loggedIn: state.login.loggedIn
    });
}

export default connect(mapStateToProps)(AppRouter);
