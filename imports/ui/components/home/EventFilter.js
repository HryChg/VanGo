import React from 'react';
import { connect } from 'react-redux';
import { Slider } from "react-semantic-ui-range";
import { Grid } from 'semantic-ui-react';

import Toggle from "../Toggle";
import { updateCategories, filterPrice } from "../../actions/eventFilterActions";
import { toggleCategoryInArray } from "../../../util/util";
import { debounce } from 'lodash';

import CurrentEvents from '../../../api/CurrentEvents';

//https://www.npmjs.com/package/react-semantic-ui-range

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
        let maxPrice = Math.max.apply(Math, this.props.events.map(event => { return event.price }));
        return maxPrice;
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
                </Grid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <h4>Price:</h4> 
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Slider multiple color="red" settings={{
                                start: [-1, 0],
                                min: 0,
                                max: this.getMaxPrice(),
                                step: 1,
                                onChange: debounce((value) => {
                                    (this.props.filterPrice(value))
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
    updateCategories: updateCategories,
    filterPrice: filterPrice
})(EventFilter);
