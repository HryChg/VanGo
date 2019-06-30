import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Accounts } from 'meteor/accounts-base';

class RegistrationPage extends React.Component {
    render() {
        return(
            <div id="register-block" className="container ui card" style={{width: '25%'}}>
            <h2>Register</h2>
            <form className="ui form" id="register-form" onSubmit={(e) => {e.preventDefault();}}>
                <div className="form-section">
                    <label className="form-label">
                        Name
                        <input id="name" type="text" className="form-item" />
                        {/* onChange={(e) => this.props.updateFirstName(e)}/> */}
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
                    <button className="ui button" 
                    onClick={Accounts.createUser({email: this.props.email, password: this.props.password, profile: this.props.name})}>
                        Register
                    </button>
                    <Link to="/login">Cancel</Link>
                </div>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.registerReducer.name, 
        email: state.registerReducer.email,
        password: state.registerReducer.password
    };
}

export default connect(mapStateToProps)(RegistrationPage);