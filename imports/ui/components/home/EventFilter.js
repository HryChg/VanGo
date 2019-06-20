import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Toggle from "../Toggle";
import {updateCategories, updatePricePoints} from "../../actions/eventFilterActions";
import {VanGoStore} from "../../../../client/main";
import {containOneOf, toggleItemInArray} from "../../../util/util";

class EventFilter extends React.Component {
    // EFFECTS: handle value sent from the toggles.
    //          If toggleText exist in either categories or price points,
    //          remove it. If not, add it.
    handleToggle = (toggleText) => {
        let toggleType = this.getToggleType(toggleText);
        if (toggleType === 'CATEGORY'){
            const currentCategoriesInStore = VanGoStore.getState().eventFilter.categories;
            let newCategories = toggleItemInArray(currentCategoriesInStore, toggleText);
            this.props.updateCategories(newCategories);

        } else if (toggleType === 'PRICE_POINT'){
            const currentPricePointsInStore = VanGoStore.getState().eventFilter.pricePoints;
            let newPricePoints = toggleItemInArray(currentPricePointsInStore, toggleText);
            this.props.updatePricePoints(newPricePoints);
        }
    };

    // EFFECTS: determine if the toggleText is a PricePoint or a Category
    getToggleType(toggleText){
        return containOneOf([toggleText], ['Free', '$', '$$', '$$$', '$$$$'])? 'PRICE_POINT' : 'CATEGORY'
    }

    render() {
        // TODO FIX THE CSS ON THE TOGGLE BUTTONS
        // TODO Move Free to under price-toggles
        return (
            <div>
                <div className={"container"}>
                    <h2 className={"ui header"}>Event Filter</h2>
                    <div className="container">
                        <div className="category-toggle">
                            <Toggle content={"Music"} sendData={this.handleToggle}/>
                            <Toggle content={"Food"} sendData={this.handleToggle}/>
                            <Toggle content={"Sightseeing"} sendData={this.handleToggle}/>
                            <Toggle content={"Free"} sendData={this.handleToggle}/>
                        </div>
                        <div className="price-toggle">
                            <Toggle content={"$"} sendData={this.handleToggle}/>
                            <Toggle content={"$$"} sendData={this.handleToggle}/>
                            <Toggle content={"$$$"} sendData={this.handleToggle}/>
                            <Toggle content={"$$$$"} sendData={this.handleToggle}/>
                        </div>
                    </div>
                    <div className={"container"}>
                        <Link className="ui primary button container" to="/edit">Show Nearby Attractions</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {eventFilter: state.eventFilter};
};

export default connect(mapStateToProps, {
    updateCategories: updateCategories,
    updatePricePoints: updatePricePoints
})(EventFilter);
