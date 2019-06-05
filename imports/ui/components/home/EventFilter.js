import React from 'react';
import {connect} from 'react-redux';
import Toggle from "../Toggle";
import Button from "../Button";
import { Link } from 'react-router-dom';

class EventFilter extends React.Component {
    render() {
        return (<div className={"container center"}>
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
                <div className="eight wide column">
                    <Toggle content={"$"}/>
                    <Toggle content={"$$"}/>
                </div>
                <div className="eight wide column">
                    <Toggle content={"$$$"}/>
                    <Toggle content={"$$$$"}/>
                </div>
            </div>

            <Link className="ui primary button container" to="/edit">Show Nearby Attraction</Link>


        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(EventFilter);
