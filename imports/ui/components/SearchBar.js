import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
    render() {
        return(<div>
            {/* TODO: Implementation to be determined */}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SearchBar);