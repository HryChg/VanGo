import React from 'react';
import { connect } from 'react-redux';

class EditPage extends React.Component {
    render() {
        return(<div>
            <h1>This is the Edit page!!!!</h1>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(EditPage);
