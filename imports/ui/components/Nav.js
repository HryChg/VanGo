// Reference: https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import LoginPage from './user/LoginPage';
import RegistrationPage from './user/RegistrationPage';
import ItineraryPage from './itinerary/ItineraryPage';
import EditPage from "./edit/EditPage";
import HomePage from "./home/HomePage";


// This part routes to "different pages"
function ProfilePage() {
    return <h2>My Profile</h2>;
}

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul className="nav-bar">
                        <li className="nav-link" id="vango-link"><Link to="/">VANGO</Link></li>
                        {/* <li className="nav-link"><Link to="/profile/">Profile</Link></li> */}
                        <li className="nav-link" id="edit-link"><Link to="/edit/">Edit</Link></li>
                        <li className="nav-link" id="itinerary-link"><Link to="/itinerary/">Itinerary</Link></li>
                        <li className="nav-link" id="login-link"><Link to="/login/">Login</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={HomePage}/>
                <Route path="/profile/" component={ProfilePage}/>
                <Route path="/edit/" exact component={EditPage}/>
                <Route path="/itinerary/" component={ItineraryPage}/>
                <Route path="/login/" component={LoginPage}/>
                <Route path="/register/" component={RegistrationPage}/>
            </div>
        </Router>
    );
}

export default AppRouter;
