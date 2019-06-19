// Reference: https://www.youtube.com/watch?v=eNxuaTGq4Qk
import React from 'react';
import ReactDOM from 'react-dom';
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { connect } from 'react-redux';
import { login } from '../../actions/index.js';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    componentDidMount() {
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        Blaze.remove(this.view);
    }

    render() {
        return(
            <span ref="container" />
        //     <div id="login-block" className="container ui card" style={{width: '25%'}}>
        //     {/* TODO: Integrate Google Login */}
        //     <h2>Login</h2>
        //     <form className="ui form" id="login-form" onSubmit={(e) => {e.preventDefault();}}>
        //         <div className="form-section">
        //             <label className="form-label">
        //                 Email
        //                 <input id="email" type="text" className="form-item" />
        //                 {/* onChange={(e) => this.props.updateEmail(e)}/> */}
        //             </label>
        //         </div>
        //         <div className="form-section">
        //             <label className="form-label">
        //                 Password
        //                 <input id="password" type="text" className="form-item" />  
        //                 {/* onChange={(e) => this.props.updatePassword(e)}/> */}
        //             </label>
        //         </div>
        //         <div>
        //             <button className="ui button">Login</button>
        //             <Link to="/register">Register</Link>
        //         </div>
        //     </form>
        // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, { login })(Login);