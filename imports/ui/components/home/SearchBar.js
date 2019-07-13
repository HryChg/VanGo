// https://react.semantic-ui.com/modules/search/#types-standard


import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {connect} from "react-redux";
import {search} from "../../actions/SearchBarActions";

const initialState = {isLoading: false, results: [], value: ''};

const items = [{
    "_id": "QPTgFcGk7zHfRneJ3",
    "name": "Toast to the Coast",
    "start_time": "2019-07-12T19:00:00-07:00",
    "end_time": null,
    "price": 150,
    "free": false,
    "location": {
        "address1": "845 Avison Way",
        "address2": "",
        "address3": "",
        "city": "Vancouver",
        "zip_code": "V6G 3E2",
        "country": "CA",
        "state": "BC",
        "display_address": ["845 Avison Way", "Vancouver, BC V6G 3E2", "Canada"],
        "cross_streets": ""
    },
    "latitude": 49.3007944919085,
    "longitude": -123.130930028311,
    "link": "https://www.yelp.com/events/vancouver-toast-to-the-coast-2?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
    "category": "food-and-drink",
    "type": "Event",
    "description": "This summer, step out and support the oceans as you enjoy gourmet bites and sip signature blends at the 13th annual Toast to the Coast fundraiser. For the..."
},
    {
        "_id": "NA9psaaJJaRfWWFe2",
        "name": "Theatre Under the Stars presents Mamma Mia! and Disney's Newsies: July 5-August 17, 2019",
        "start_time": "2019-07-05T20:00:00-07:00",
        "end_time": "2019-07-12T22:00:00-07:00",
        "price": null,
        "free": false,
        "location": {
            "address1": "610 Pipeline Rd,",
            "address2": "",
            "address3": "",
            "city": "Vancouver",
            "zip_code": "V6G 3E2",
            "country": "CA",
            "state": "BC",
            "display_address": ["610 Pipeline Rd,", "Vancouver, BC V6G 3E2", "Canada"],
            "cross_streets": ""
        },
        "latitude": 49.2997083,
        "longitude": -123.1339011,
        "link": "https://www.yelp.com/events/vancouver-theatre-under-the-stars-presents-mamma-mia-and-disneys-newsies-july-5-august-17-2019?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
        "category": "performing-arts",
        "type": "Event",
        "description": "Theatre Under the Stars (TUTS) invites audiences to a summer of inspiration with Mamma Mia! and Disney's Newsies, running alternate evenings from July..."
    }
];
const convertItemsToSearchables = (items) => {
    let searchables = [];
    for (let item of items) {
        let searchable = {
            title: item.name,
            description: item.description,
            price: (item.price) ? '$' + item.price : '$ n/a',
            _id: item._id
        };
        searchables.push(searchable);
    }
    return searchables;
};
const source = convertItemsToSearchables(items);


class SearchBar extends Component {
    state = this.props.searchBar;

    componentDidMount() {
        console.log(this.props);
    }

    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title});
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    };

    render() {
        const {isLoading, value, results} = this.state;


        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={results}
                value={value}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {searchBar: state.searchBar}
};

export default connect(mapStateToProps, {
    search: search
})(SearchBar);
