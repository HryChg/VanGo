// Reference: https://www.youtube.com/watch?v=eNxuaTGq4Qk
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { connect } from 'react-redux';

class Login extends React.Component {
    toggleUserView() {
        if (this.props.loggedIn) {
            return (<Redirect to='/' />);
        } else {
            return (
            <div className="center outer">
                <Blaze id="login-block" template="atForm" className="container inner" style={{width: '25%'}}/>
            </div>
            );
        }
    }

    render() {
        return(<div>{this.toggleUserView()}</div>);
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.loggedIn
    };
}

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, { login })(Login);