import React from 'react';
import {connect} from 'react-redux';
import Toggle from "../Toggle";
import Button from "../Button";
import {Link} from 'react-router-dom';

class EventFilter extends React.Component {
    render() {
        return (
            <div>




                <div className={"container"}>
                    <h2 className={"ui header"}>Event Filter</h2>

                    <div className="container">
                        <Toggle content={"Music"}/>
                        <Toggle content={"Food"}/>
                        <Toggle content={"Theater"}/>
                        <Toggle content={"Free"}/>
                        <Toggle content={"$"}/>
                        <Toggle content={"$$"}/>
                        <Toggle content={"$$$"}/>
                        <Toggle content={"$$$$"}/>
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
    return state;
};

export default connect(mapStateToProps)(EventFilter);
