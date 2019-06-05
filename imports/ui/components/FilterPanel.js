import React from 'react';
import { connect } from 'react-redux';

class FilterPanel extends React.Component {
    render() {
        return(<div> 
            {/* TODO: Include checkboxes */}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(FilterPanel);