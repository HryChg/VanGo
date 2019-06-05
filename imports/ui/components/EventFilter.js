import React from 'react';
import { connect } from 'react-redux';
import Toggle from "./Toggle";
import SideNav from "./SideNav";
import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import MapContainer from "./MapContainer";

class EventFilter extends React.Component {
    render() {
        return(<div className={"container"}>
            <h2>Event Filter</h2>
            <div className="ui grid container">
                <div className="eight wide column">
                    <Toggle content={"Music"}/>
                    <Toggle content={"Food"}/>
                </div>
                <div className="eight wide column">
                    <Toggle content={"Theater"}/>
                    <Toggle content={"Free"}/>
                </div>
            </div>


        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(EventFilter);
