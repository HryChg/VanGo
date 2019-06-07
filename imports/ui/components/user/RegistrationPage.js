import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class RegistrationPage extends React.Component {
    render() {
        return(
            <div id="register-block" className="container ui card" style={{width: '25%'}}>
            <h2>Register</h2>
            <form className="ui form" id="register-form" onSubmit={(e) => {e.preventDefault();}}>
                <div className="form-section">
                    <label className="form-label">
                        First Name
                        <input id="first-name" type="text" className="form-item" />
                        {/* onChange={(e) => this.props.updateFirstName(e)}/> */}
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Last Name
                        <input id="last-name" type="text" className="form-item" />
                        {/* onChange={(e) => this.props.updateLastName(e)}/> */}
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Email
                        <input id="email" type="text" className="form-item" />  
                        {/* onChange={(e) => this.props.updateEmail(e)}/> */}
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Password
                        <input id="password" type="text" className="form-item" />
                        {/* onChange={(e) => this.props.updatePassword(e)}/> */}
                    </label>
                </div>
                <div>
                    <button className="ui button">Register</button>
                    <Link to="/login">Cancel</Link>
                </div>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(RegistrationPage);