import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index.js';

class LoginPopup extends React.Component {
    render() {
        return(
            <div id="login-block">
            {/* TODO: Integrate Google Login */}
            <form id="login-form" onSubmit={(e) => {e.preventDefault();}}>
                <label className="form-label">
                    Email
                    <input id="email" type="text" className="form-item" value={this.props.form.name} onChange={(e) => this.props.updateEmail(e)}/>
                </label>
                <label className="form-label">
                    Password
                    <input id="password" type="text" className="form-item" value={this.props.form.name} onChange={(e) => this.props.updatePassword(e)}/>
                </label>
                <br />
                <button onClick={() => this.props.login()}>Log In</button>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { login })(LoginPopup);