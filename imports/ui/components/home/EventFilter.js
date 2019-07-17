//Reference: https://www.npmjs.com/package/react-semantic-ui-range

import React from 'react';
import { connect } from 'react-redux';
import { Slider } from "react-semantic-ui-range";
import { Grid, Input } from 'semantic-ui-react';

import Toggle from "../Toggle";
import { updateCategories, filterPrice, filterPriceByEntry } from "../../actions/eventFilterActions";
import { toggleCategoryInArray } from "../../../util/util";
import { debounce } from 'lodash';

class EventFilter extends React.Component {

    // REQUIRES: input must be a valid Yelp category
    // EFFECTS: handle value sent from the toggles.
    //          If toggleText exist in either categories or price range,
    //          remove it. If not, add it.
    handleToggle = (toggleText) => {
        let categories;
        switch(toggleText) {
            case "Art & Music": 
                categories = ["music", "visual-arts", "performing-arts", "film", "fashion"];
                break;
            case "Education":
                categories = ["lectures-books"];
                break;
            case "Food":
                categories = ["food-and-drink"];
                break;
            case "Festivals":
                categories = ["festivals-fairs"];
                break;
            case "Family":
                categories = ["kids-family"];
                break;
            case "Other":
                categories = ["charities", "sports-active-life", "nightlife", "other"];
                break;
        }
        const currentCategoriesInStore = this.props.eventFilter.categories;
        let newCategories = toggleCategoryInArray(currentCategoriesInStore, categories);
        this.props.updateCategories(newCategories);
    };

    //EFFECTS: Returns the max price of all loaded events for the day
    getMaxPrice() {
        let maxPrice = Math.max.apply(Math, this.props.items.map(item => { return item.price }));
        return maxPrice;
    }

    //EFFECTS: formats and displays price range
    // if the lower and upper bounds are equal, display one value
    displayPrice(priceRange) {
        let lowerBound = priceRange[0] < 0 ? 0 : priceRange[0];
        let upperBound = priceRange[1];
        if (lowerBound === upperBound) {
            return "$" + lowerBound;
        }
        return "$" + lowerBound + " to $" + upperBound;
    }

    render() {
        return (
            <div className={""}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                        <h4 className={"filter-margin"} id={"filter-name"}>Filters:</h4>
                            <div className="container toggles">
                                <Toggle content={"Art & Music"} sendData={this.handleToggle} />
                                <Toggle content={"Food"} sendData={this.handleToggle} />
                                <Toggle content={"Education"} sendData={this.handleToggle} />
                            </div>
                            <div className="container toggles">
                                <Toggle content={"Festivals"} sendData={this.handleToggle} />
                                <Toggle content={"Family"} sendData={this.handleToggle} />
                                <Toggle content={"Other"} sendData={this.handleToggle} />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <h4>{"Price:  "}
                                <span style={{fontWeight: "normal"}}>
                                    {this.displayPrice(this.props.eventFilter.priceRange)}
                                </span>
                            </h4>
                            {/* <Input placeholder="Enter Value" onChange={(e) => {this.props.filterPriceByEntry(e)}} />
                                to
                            <Input placeholder="Enter Value" onChange={(e) => {this.props.filterPriceByEntry(e)}} /> */}
                            <Slider multiple color="red" settings={{
                                start: [-1, 0],
                                min: 0,
                                max: this.getMaxPrice(),
                                step: 1,
                                onChange: debounce((value) => {
                                    this.props.filterPrice(value)
                                }, 500)
                            }} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { eventFilter: state.eventFilter };
};

export default connect(mapStateToProps, {
    updateCategories,
    filterPrice,
    filterPriceByEntry
})(EventFilter);
