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
        let categories = [];
        let eventTypes = [];
        let attractionTypes = [];
        switch(toggleText) {
            case "Entertainment": 
                eventTypes = ["music", "visual-arts", "performing-arts", "film", "fashion"];
                attractionTypes = ["publicart", "museums", "whalewatchingtours", "artmuseums"]
                categories = categories.concat(eventTypes, attractionTypes);
                break;
            case "Education":
                eventTypes = ["lectures-books"];
                attractionTypes = []
                categories = categories.concat(eventTypes, attractionTypes);
                break;
            case "Food":
                eventTypes = ["food-and-drink"];
                attractionTypes = ["foodtours", "beertours"]
                categories = categories.concat(eventTypes, attractionTypes);
                break;
            case "Festivals":
                eventTypes = ["festivals-fairs"];
                attractionTypes = []
                categories = categories.concat(eventTypes, attractionTypes);
                break;
            case "Family":
                eventTypes = ["kids-family"];
                attractionTypes = []
                categories = categories.concat(eventTypes, attractionTypes);
                break;
            case "Other":
                eventTypes = ["charities", "sports-active-life", "nightlife", "other"];
                attractionTypes = ["landmarks", "tours", "parks", "libraries", "walkingtours", "localflavor", "bustours"]
                categories = categories.concat(eventTypes, attractionTypes);
                break;
        }
        const currentCategoriesInStore = this.props.eventFilter.categories;
        let newCategories = toggleCategoryInArray(currentCategoriesInStore, categories);
        this.props.updateCategories(newCategories);
    };

    // EFFECTS: stores max price range into state
    setMaxPrice() {
        maxPrice = this.getMaxPrice();
        this.props.filterPrice([0, maxPrice]);
    }

    //EFFECTS: Returns the max price of all loaded events for the day
    getMaxPrice() {
        if (!Array.isArray(this.props.items) || !this.props.items.length) return 0;
        let maxPrice = Math.max.apply(Math, this.props.items.map(item => { return item.price }));
        return maxPrice;
    }

    //EFFECTS: formats and displays price range
    // if the lower and upper bounds are equal, display one value
    displayPrice(priceRange) {
        let lowerBound = priceRange[0] < 0 ? 0 : priceRange[0];
        let upperBound;
        if (upperBound < 0) {
            upperBound = 0;
        } else {
            upperBound = this.getMaxPrice();
        }
        if (lowerBound === upperBound) {
            return "$" + lowerBound;
        }
        return "$" + lowerBound + " to $" + upperBound;
    }

    render() {
        const maxPrice = this.getMaxPrice();
        return (
            <div className={""}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                        <h4 className={"filter-margin"} id={"filter-name"}>Filters:</h4>
                            <div className="container toggles">
                                <Toggle content={"Entertainment"} sendData={this.handleToggle} />
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
                                start: [this.props.eventFilter.priceRange[0], maxPrice +10],
                                min: 0,
                                max: maxPrice + 10,
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
    return { 
        eventFilter: state.eventFilter,
    };
};

export default connect(mapStateToProps, {
    updateCategories,
    filterPrice,
    filterPriceByEntry
})(EventFilter);
