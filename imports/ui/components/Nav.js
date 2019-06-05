// Code is based on https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// This part is static
function Index() {
    return <h2>Home</h2>;
}

function Login() {
    return <h2>Login</h2>;
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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about/">About</Link></li>
                        <li><Link to="/profile/">Profile</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={Index} />
                <Route path="/about/" component={Login} />
                <Route path="/profile/" component={Profile} />
            </div>
        </Router>
    );
}

export default AppRouter;