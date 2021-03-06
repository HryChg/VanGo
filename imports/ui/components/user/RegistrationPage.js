import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateRegisterField, createUser, resetRegisterPage } from '../../actions/userActions';
import { Message } from 'semantic-ui-react';

class RegistrationPage extends React.Component {
    componentWillUnmount() {
        this.props.resetRegisterPage();
    }

    displayError() {
        if (this.props.error) {
            return (
            <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{this.props.error.reason}</p>
            </Message>
            );
        }
    }

    render() {
        if (this.props.register) {
            return (
                <Redirect exact to='/login'/>
            );
        } else {
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
                            name="email" autoComplete="username email"
                            onChange={(e) => this.props.updateRegisterField(e)}/>
                        </label>
                    </div>
                    <div className="form-section">
                        <label className="form-label">
                            Password
                            <input id="password" type="password" className="form-item" value={this.props.password}
                            name="password" autoComplete="current-password"
                            onChange={(e) => this.props.updateRegisterField(e)}/>
                        </label>
                    </div>
                    <div>
                        <button className="ui button" 
                        onClick={() => {this.props.createUser(this.props.email, this.props.password, this.props.name)}}>
                            Register
                        </button>
                        <Link to="/login">Cancel</Link>
                        {this.displayError()}
                    </div>
                </form>
            </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.registerForm.name, 
        email: state.registerForm.email,
        password: state.registerForm.password,
        register: state.register.register,
        error: state.register.error
    };
}

export default connect(mapStateToProps, { updateRegisterField, createUser, resetRegisterPage })(RegistrationPage);