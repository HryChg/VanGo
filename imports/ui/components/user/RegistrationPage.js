import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {BrowserRouter as Redirect} from 'react-router-dom';
import { updateRegisterField, createUser } from '../../actions/userActions';

class RegistrationPage extends React.Component {
    redirect() {
        if (this.props.registerSuccess) {
            return (<Redirect to='/'/>);
        }
    }

    render() {
        return(
            <div id="register-block" className="container ui card" style={{width: '25%'}}>
            <h2>Register</h2>
            <form className="ui form" id="register-form" onSubmit={(e) => {e.preventDefault();}}>
                <div className="form-section">
                    <label className="form-label">
                        Name
                        <input id="name" type="text" className="form-item" value={this.props.name}
                        onChange={(e) => this.props.updateRegisterField(e)}/>
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Email
                        <input id="email" type="text" className="form-item" value={this.props.email}
                        onChange={(e) => this.props.updateRegisterField(e)}/>
                    </label>
                </div>
                <div className="form-section">
                    <label className="form-label">
                        Password
                        <input id="password" type="password" className="form-item" value={this.props.password}
                        onChange={(e) => this.props.updateRegisterField(e)}/>
                    </label>
                </div>
                <div>
                    <button className="ui button" 
                    onClick={() => {this.props.createUser(this.props.email, this.props.password, this.props.name, () => {
                        this.redirect();
                    });}}>
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
        name: state.registerForm.name, 
        email: state.registerForm.email,
        password: state.registerForm.password,
        redirectSuccess: state.register.register
    };
}

export default connect(mapStateToProps, { updateRegisterField, createUser })(RegistrationPage);