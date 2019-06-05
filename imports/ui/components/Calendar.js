import React from 'react';
import { connect } from 'react-redux';

class Calendar extends React.Component {
    render() {
        return(<div>
            {/* TODO: See GoogleDocs link */}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SearchBar);