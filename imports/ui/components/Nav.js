// Reference: https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import LoginPage from './user/LoginPage';
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
                        <li className="nav-link" id="vango-link"><NavLink to="/">VANGO</NavLink></li>
                        {/* <li className="nav-link"><NavLink to="/profile/">Profile</NavLink></li> */}
                        <li className="nav-link" id="edit-link"><NavLink to="/edit/">Edit</NavLink></li>
                        <li className="nav-link" id="itinerary-link"><NavLink to="/itinerary/">Itinerary</NavLink></li>
                        <li className="nav-link" id="login-link"><NavLink to="/login/">Login</NavLink></li>
                        <li className="nav-link" id="logout-link" onClick={AccountsTemplates.logout()}><NavLink to="/logout/">Logout</NavLink></li>
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

export default AppRouter;
