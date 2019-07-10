import React from 'react';
import { connect } from 'react-redux';

import Toggle from "../Toggle";
import { updateCategories, filterPrice } from "../../actions/eventFilterActions";
import { containOneOf, toggleItemInArray } from "../../../util/util";
import { Slider } from "react-semantic-ui-range";
import CurrentEvents from '../../../api/CurrentEvents';

//https://www.npmjs.com/package/react-semantic-ui-range

class EventFilter extends React.Component {

    // EFFECTS: handle value sent from the toggles.
    //          If toggleText exist in either categories or price range,
    //          remove it. If not, add it.
    handleToggle = (toggleText) => {
        const currentCategoriesInStore = this.props.eventFilter.categories;
        let newCategories = toggleItemInArray(currentCategoriesInStore, toggleText);
        this.props.updateCategories(newCategories);
    };

    //EFFECTS: Returns the max price of all loaded events for the day
    getMaxPrice() {
        let maxPrice = Math.max.apply(Math, this.props.events.map(event => { return event.price }));
        return maxPrice;
    }

    render() {
        return (
            <div className={""}>
                <div className={"ui grid"}>
                    <div className={"sixteen wide column"}>
                    <h4 className={"filter-margin"} id={"filter-name"}>Filters:</h4>
                        <div className="container">
                            <Toggle content={"Music"} sendData={this.handleToggle} />
                            <Toggle content={"Food"} sendData={this.handleToggle} />
                            <Toggle content={"Sightseeing"} sendData={this.handleToggle} />
                        </div>
                    </div>
                </div>
                <div className={"ui grid"}>
                    <div className={"two wide column"}>
                        <h4>Price:</h4> 
                    </div>
                    <div className={"fourteen wide column"}>
                        <Slider multiple color="red" settings={{
                            start: [-1, 0],
                            min: 0,
                            max: this.getMaxPrice(),
                            step: 1,
                            onChange: (value) => { // TODO: See if onMouseUp can be integrated
                                this.props.filterPrice(value);
                            }
                        }} />
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
    filterPrice: filterPrice
})(EventFilter);
