// https://react.semantic-ui.com/modules/search/#types-standard
import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {connect} from "react-redux";
import {withTracker} from 'meteor/react-meteor-data';

import {setSelected, setValue, setIsLoadingTrue, setIsLoadingFalse, setResults} from "../../actions/SearchBarActions";
import CurrentEvents from '../../../api/CurrentEvents';


let source = []; // DO NOT DELETE. SearchBar component will modify this.
class SearchBar extends Component {

    // EFFECTS: convert items from currentEvent collection to searchable items in the search bar
    convertItemsToSearchables(items) {
        let searchables = [];
        for (let item of items) {
            let searchable = {
                title: item.name,
                description: item.description,
                price: (item.price) ? '$' + item.price : '$ n/a',
                _id: item._id,
                key: item._id
            };
            searchables.push(searchable);
        }
        return searchables;
    };

    // EFFECTS: get the searchable items ready for the search bar.
    //          Display "Loading..." until results from meteor call back is ready
    componentDidMount() {
        this.props.setIsLoadingTrue();
        this.props.setValue('Loading...');
        Meteor.call('getCurrentEvents', (err, res)=>{
            source = this.convertItemsToSearchables(res);
            this.props.setValue('');
            this.props.setResults(source);
<<<<<<< HEAD
            console.log(source);
        }, 300)


=======
            this.props.setIsLoadingFalse();
        })
>>>>>>> master
    }

    // EFFECTS: set the text value and the _id of the selected items in the search bar reducer
    handleResultSelect = (e, {result}) => {
        this.props.setValue(result.title);
        this.props.setSelected(result._id);
    };

    // EFFECTS:  perform the search logic in the search bar
    //           wait 0.3 sec for the spinner animation before performing the search
    handleSearchChange = (e, {value}) => {
        this.props.setValue(value);
        this.props.setIsLoadingTrue(); // trigger the loading spinner

        setTimeout(() => {
            if (this.props.searchBar.value.length < 1) { // when the search bar contains empty str
                this.props.setSelected('');
                this.props.setIsLoadingFalse();
                this.props.setResults([]);
                return;
            }

            const re = new RegExp(_.escapeRegExp(this.props.searchBar.value), 'i');
            const isMatch = result => re.test(result.title);
            this.props.setIsLoadingFalse();
            this.props.setResults(_.filter(source, isMatch)); // filter based on searchable title
        }, 300)
    };

    render() {
        const {isLoading, value, results} = this.props.searchBar;
        return (<div>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    results={results}
                    value={value}
                    input={{ fluid: true }} // maximize search bar width
                    fluid={true} // maximize result menu width
                />
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {searchBar: state.searchBar}
};

const SearchBarContainer = withTracker(() => {
    const handle = Meteor.subscribe('currentEvents');
    const currentEvents = CurrentEvents.find().fetch();
    return {
        dataReady: handle.ready(),
        currentEvents: currentEvents,
    }
})(SearchBar);

export default connect(mapStateToProps, {
    setValue: setValue,
    setSelected: setSelected,
    setIsLoadingTrue: setIsLoadingTrue,
    setIsLoadingFalse: setIsLoadingFalse,
    setResults: setResults
})(SearchBarContainer);
