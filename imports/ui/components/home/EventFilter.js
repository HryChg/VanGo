import React from 'react';
import {connect} from 'react-redux';
import Toggle from "../Toggle";
import {Link} from 'react-router-dom';
import {updateFilters} from "../../actions/eventFilterActions";
import {VanGoStore} from "../../../../client/main";

class EventFilter extends React.Component {

    collectToggles = () => {
        // TODO collect information from toggles, create a list of categories and update it to the store

        let categories = ["categoryA", "categoryB", "category"];

        // TODO if the current category does not differ from before, do not update
        this.props.updateFilters(categories);
    };

    // EFFECTS: handle value sent from the toggles
    handleToggle = (toggleText) => {
        console.log(`${toggleText} handled!`);
        const currentCategoriesInStore = VanGoStore.getState().eventFilter.categories;
        let newCategories = null;
        if (currentCategoriesInStore.includes(toggleText)){
            newCategories = currentCategoriesInStore.filter((category) => {return category !== toggleText});
        } else {
            newCategories = [...currentCategoriesInStore, toggleText];
        }




        this.props.updateFilters(newCategories);
        console.log(`the new categories are: ${VanGoStore.getState().eventFilter.categories}`);
    };

    render() {
        return (
            <div>
                <div className={"container"}>
                    <h2 className={"ui header"}>Event Filter</h2>
                    <div className="container">
                        <div className="category-toggle">
                            <Toggle content={"Music"} sendData={this.handleToggle}/>
                            <Toggle content={"Food"} sendData={this.handleToggle}/>
                            <Toggle content={"Theater"} sendData={this.handleToggle}/>
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
