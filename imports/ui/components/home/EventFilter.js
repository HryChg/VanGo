import React from 'react';
import {connect} from 'react-redux';
import Toggle from "../Toggle";
import {Link} from 'react-router-dom';
import {updateFilters} from "../../actions/eventFilterActions";

class EventFilter extends React.Component {

    collectToggles = () => {
        // TODO collect information from toggles, create a list of categories and update it to the store

        let categories = ["categoryA", "categoryB", "category"];


        // TODO if the current category does not differ from before, do not update
        this.props.updateFilters(categories);
    };



    render() {
        return (
            <div>
                <div className={"container"}>
                    <h2 className={"ui header"}>Event Filter</h2>
                    <div className="container">
                        <div className="category-toggle">
                            <Toggle content={"Music"}/>
                            <Toggle content={"Food"}/>
                            <Toggle content={"Theater"}/>
                            <Toggle content={"Free"}/>
                        </div>
                        <div className="price-toggle">
                            <Toggle content={"$"}/>
                            <Toggle content={"$$"}/>
                            <Toggle content={"$$$"}/>
                            <Toggle content={"$$$$"}/>
                        </div>
                    </div>
                    <div className={"container"}>
                        <Link className="ui primary button container" to="/edit">Show Nearby Attraction</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {updateFilters: state.updateFilters};
};

export default connect(mapStateToProps, {updateFilters})(EventFilter);
