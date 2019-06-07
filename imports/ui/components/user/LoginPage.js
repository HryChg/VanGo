import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/index.js';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return(
            <div id="login-block" className="container ui card" style={{width: '25%'}}>
            {/* TODO: Integrate Google Login */}
            <h2>Login</h2>
            <form className="ui form" id="login-form" onSubmit={(e) => {e.preventDefault();}}>
                <label className="form-label">
                    Email
                    <input id="email" type="text" className="form-item" />
                    {/* onChange={(e) => this.props.updateEmail(e)}/> */}
                </label>
                <br/>
                <label className="form-label">
                    Password
                    <input id="password" type="text" className="form-item" />  
                    {/* onChange={(e) => this.props.updatePassword(e)}/> */}
                </label>
                <br/>
                <button className="ui button">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, { login })(Login);