import React from 'react';
import { connect } from 'react-redux';

import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';

class ItineraryPage extends React.Component {
    render() {
        return(
            <div className="ui grid">
            <div className="four wide column">
                <div className="it-panel-bkgd">
                    <div className="it-panel sidenav">
                        <h2>VanGo</h2>
                        <ItineraryDatePanel><h2>VanGo</h2></ItineraryDatePanel>
                    </div>
                </div>
            </div>
            <div className="twelve wide column">
                <div
                    className={"container"}
                    style={{width: '500px', height:'50vh'}}
                >
                    <h1>{this.props.itinerary.selectedDate}</h1>
                    <MapContainer height="50%" width="95%"/>
                    <div className="it-map"></div> {/* Workaround Used to block out size of map */}
                    <div><ItineraryList/></div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        itinerary: state.itinerary
    };
}

export default connect(mapStateToProps)(ItineraryPage);