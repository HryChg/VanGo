import React from 'react';
import { connect } from 'react-redux';

class Toggle extends React.Component {
    render() {
        return(<div>
            <div className={"ui toggle checkbox"}>
                <input type={"checkbox"} name={"public"} onClick={this.props.action}/>
                    <label>{this.props.content}</label>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Toggle);
