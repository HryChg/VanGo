import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLoginField, login } from '../../actions/userActions';

class Login extends React.Component {
    render() {
        return(
            <div id="login-block" className="container ui card" style={{width: '25%'}}>
            {/* TODO: Integrate Google Login */}
            <h2>Login</h2>
            <form className="ui form" id="login-form" onSubmit={(e) => {e.preventDefault();}}>
                <div className="form-section">
                    <label className="form-label">
                        Email
                        <input id="email" type="text" className="form-item"
                        onChange={(e) => this.props.updateLoginField(e)}/>
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Password
                        <input type="password" id="password" className="form-item"
                        onChange={(e) => this.props.updateLoginField(e)}/>
                    </label>
                </div>
                <div>
                    <button className="ui button" 
                    onClick={() => {this.props.login(this.props.email, this.props.password)}}>
                        Login
                    </button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.loginForm.email,
        password: state.loginForm.password
    };
}

export default connect(mapStateToProps, { updateLoginField, login })(Login);