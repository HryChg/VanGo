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
        this.view = Blaze.render(Template.atForm,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        Blaze.remove(this.view);
    }

    render() {
        return(
            <div className="center outer">
                <div id="login-block" ref="container" className="container inner" style={{width: '25%'}}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, { login })(Login);