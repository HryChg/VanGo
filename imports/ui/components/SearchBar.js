// https://medium.com/@yaoxiao1222/implementing-search-filter-a-list-on-redux-react-bb5de8d0a3ad
import React from 'react';
import {connect} from 'react-redux';
import {search} from "../actions/SearchBarActions";
import { Input, Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
    }

    onClickSearch = () => {
        let keyword = document.querySelector('#searchInput').value;
        if (keyword !== '') {
            this.props.search(keyword);
        }
    };

    render() {
        return (
            <div id={"searchInputContainer"} >
                <Input 
                    id={"searchInput"} 
                    action={<Button icon='search' onClick={this.onClickSearch} />}  
                    placeholder="Search Events Here..." 
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {search: state.search};
};

export default connect(mapStateToProps, {search})(SearchBar);

