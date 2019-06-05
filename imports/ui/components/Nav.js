// Code is based on https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import MapContainer from './MapContainer';
import LoginPage from './user/LoginPage';
import RegistrationPage from './user/RegistrationPage';
import ItineraryPage from './itinerary/ItineraryPage';
import SideNav from "./SideNav";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import EventFilter from "./EventFilter";
import EditPage from "./edit/EditPage";


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
                        <EventFilter/>

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
    return (<h2>
        <EditPage/>
    </h2>);
}

function Profile() {
    return <h2>My Profile</h2>;
}

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul className="nav-bar">
                        <li className="nav-link"><Link to="/">VANGO</Link></li>
                        <li className="nav-link"><Link to="/profile/">Profile</Link></li>
                        <li className="nav-link"><Link to="/edit/">Edit</Link></li>
                        <li className="nav-link"><Link to="/itinerary/">Itinerary</Link></li>
                        <li className="nav-link"><Link to="/login/">Login</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={Home}/>
                <Route path="/profile/" component={Profile}/>
                <Route path="/edit/" exact component={Edit}/>
                <Route path="/itinerary/" component={ItineraryPage}/>
                <Route path="/login/" component={LoginPage}/>
                <Route path="/register/" component={RegistrationPage}/>
            </div>
        </Router>
    );
}

export default AppRouter;
