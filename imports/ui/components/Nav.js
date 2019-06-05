// Code is based on https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MapView from './MapView';

// This part routes to "different pages"
function Home() {
    return (<div>
        <h2>Home</h2>
        <MapView />
        <p>Test</p>
        </div>);
}

function Edit() {
    return <h2>Edit</h2>;
}

function Login() {
    return <h2>Login</h2>;
}

function Itinerary() {
    return <h2>My Itinerary</h2>;
}

function Profile() {
    return <h2>My Profile</h2>;
}

function AppRouter() {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">VANGO</Link></li>
                        <li><Link to="/profile/">Profile</Link></li>
                        {/* <li><Link to="/edit/">Edit</Link></li>  */}  {/* TODO: To link from Home */}
                        <li><Link to="/itinerary/">Itinerary</Link></li>
                        <li><Link to="/login/">Login</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={Home} />
                <Route path="/profile/" component={Profile} />
                <Route path="/edit/" exact component={Edit} />
                <Route path="/itinerary/" component={Itinerary} />
                <Route path="/login/" component={Login} />
            </div>
        </Router>
    );
}

export default AppRouter;