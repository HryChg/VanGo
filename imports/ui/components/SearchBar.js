import React from 'react';
import {connect} from 'react-redux';

class SearchBar extends React.Component {
    // TODO: Implementation to be determined
    constructor(props) {
        super(props);
        // https://medium.com/@yaoxiao1222/implementing-search-filter-a-list-on-redux-react-bb5de8d0a3ad
        this.state = {
            searchTerm: '',
            currentlyDisplayed: this.props.terms
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        $("html, body").animate({scrollTop: 0}, 'fast');
        let newlyDisplayed = this.props.terms.filter(term => term.title.includes(event.target.value.toLowerCase()));

        this.setState({
            searchTerm: event.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }


    render() {
        return (
            <div className="ui form container">
                <div className="fields">
                    <div className="twelve wide field">
                        <input type="text" placeholder="Search Events Here..."/>
                    </div>
                    <button className="ui icon button three wide field">
                        <i className="search icon"/>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SearchBar);
