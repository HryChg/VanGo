// https://medium.com/@yaoxiao1222/implementing-search-filter-a-list-on-redux-react-bb5de8d0a3ad
import React from 'react';
import {connect} from 'react-redux';
import {search} from "../actions/SearchBarActions";

class SearchBar extends React.Component {
    constructor(props){
        super(props);
    }

    onClickSearch = () => {
        let keyword = document.querySelector('#searchInput').value;
        if (keyword !== '') {
            console.log(this.props);
            this.props.search(keyword);
        }
    };

    render() {
        return (
            <div className="ui form container">
                <div className="fields">
                    <div className="twelve wide field">
                        <input id={"searchInput"} type="text" placeholder="Search Events Here..."/>
                    </div>
                    <button className="ui icon button three wide field" onClick={this.onClickSearch}>
                        <i className="search icon"/>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {search: state.search};
};

export default connect(mapStateToProps, {search})(SearchBar);

