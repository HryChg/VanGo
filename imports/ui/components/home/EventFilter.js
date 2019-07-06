import React from 'react';
import { connect } from 'react-redux';

import Toggle from "../Toggle";
import { updateCategories, updatePricePoints, filterPrice } from "../../actions/eventFilterActions";
import { VanGoStore } from "../../../../client/main";
import { containOneOf, toggleItemInArray } from "../../../util/util";
import { Slider } from "react-semantic-ui-range";
import CurrentEvents from '../../../api/CurrentEvents';

//https://www.npmjs.com/package/react-semantic-ui-range

class EventFilter extends React.Component {

    // EFFECTS: handle value sent from the toggles.
    //          If toggleText exist in either categories or price points,
    //          remove it. If not, add it.
    handleToggle = (toggleText) => {
        let toggleType = this.getToggleType(toggleText);
        if (toggleType === 'CATEGORY') {
            const currentCategoriesInStore = VanGoStore.getState().eventFilter.categories;
            let newCategories = toggleItemInArray(currentCategoriesInStore, toggleText);
            this.props.updateCategories(newCategories);

        } else if (toggleType === 'PRICE_POINT') {
            const currentPricePointsInStore = VanGoStore.getState().eventFilter.pricePoints;
            let newPricePoints = toggleItemInArray(currentPricePointsInStore, toggleText);
            this.props.updatePricePoints(newPricePoints);
        }
    };

    // EFFECTS: determine if the toggleText is a PricePoint or a Category
    getToggleType(toggleText) {
        return containOneOf([toggleText], ['Free', '$', '$$', '$$$', '$$$$']) ? 'PRICE_POINT' : 'CATEGORY'
    }

    filterEventPrice(value) {
        const currentPricePointsInStore = VanGoStore.getState().eventFilter.pricePoints;
        let newPricePoints = toggleItemInArray(currentPricePointsInStore, toggleText);
        this.props.updatePricePoints(newPricePoints);
    }

    render() {
        return (
            <div className={""}>
                <h2 className={"ui header"}>Event Filter</h2>
                <div className={"ui grid"}>
                    <div className={"eight wide column"}>
                        <div className="container">
                            <Toggle content={"Music"} sendData={this.handleToggle} />
                            <Toggle content={"Food"} sendData={this.handleToggle} />
                            <Toggle content={"Sightseeing"} sendData={this.handleToggle} />

                        </div>
                    </div>
                    <div className={"eight wide column"}>
                        <div className={"container"}>
                            <Toggle content={"Free"} sendData={this.handleToggle} />
                            <Toggle content={"$"} sendData={this.handleToggle} />
                            <Toggle content={"$$"} sendData={this.handleToggle} />
                            <Toggle content={"$$$"} sendData={this.handleToggle} />
                            <Toggle content={"$$$$"} sendData={this.handleToggle} />
                        </div>
                    </div>
                </div>
                <div className={"ui grid"}>
                    <div className={"two wide column"}>Price: </div>
                    <div className={"fourteen wide column"}>
                        <Slider color="red" settings={{ 
                        start: 0, 
                        min: 0, 
                        max: 100,
                        // Math.max.apply(Math, this.props.currentEvents.map(e => { return o.y })), 
                        step: 1, 
                        onChange: (value) => {
                            this.props.filterPrice(value);
                        }}} />  
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { eventFilter: state.eventFilter };
};

export default connect(mapStateToProps, {
    updateCategories: updateCategories,
    updatePricePoints: updatePricePoints,
    filterPrice: filterPrice
})(EventFilter);
