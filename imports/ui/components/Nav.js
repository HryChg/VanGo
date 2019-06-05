// Code is based on https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MapContainer from './MapContainer';
import LoginPage from './user/LoginPage';
import ItineraryPage from './itinerary/ItineraryPage';
import SideNav from "./SideNav";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import Toggle from "./Toggle";


// This part routes to "different pages"
function Home() {
    return (<div>
        <h2>Home</h2>

        <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <h2>VanGo</h2>
                        <SearchBar/>
                        <DatePicker/>
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Clients</a>
                        <a href="#">Contact</a>
                        <Toggle
                            content={"Music"}
                        />
                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        className={"container"}
                        style={{width: '500px', height:'100vh'}}
                    >
                        <MapContainer
                            width={'95%'}
                            height={'95%'}
                        />
                    </div>
                </div>
        </div>

    </div>);
}

function Edit() {
    return <h2>Edit</h2>;
}

function Profile() {
    return <h2>My Profile</h2>;
}

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">VANGO</Link></li>
                        <li><Link to="/profile/">Profile</Link></li>
                        {/* <li><Link to="/edit/">Edit</Link></li>  */} {/* TODO: To link from Home */}
                        <li><Link to="/itinerary/">Itinerary</Link></li>
                        <li><Link to="/login/">Login</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={Home}/>
                <Route path="/profile/" component={Profile}/>
                <Route path="/edit/" exact component={Edit}/>
                <Route path="/itinerary/" component={ItineraryPage}/>
                <Route path="/login/" component={LoginPage}/>
            </div>
        </Router>
    );
}

export default AppRouter;
