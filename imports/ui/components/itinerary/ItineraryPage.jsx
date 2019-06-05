import React from 'react';
import { connect } from 'react-redux';
import ItineraryDatePanel from './ItineraryDatePanel';
import MapContainer from '../MapContainer';
import ItineraryList from './ItineraryList';
import SideNav from '../SideNav';

class Itinerary extends React.Component {
    render() {
        return(
            <div className="ui grid">
            <div className="four wide column">
                <SideNav>
                    <h2>VanGo</h2>
                    <ItineraryDatePanel />
                </SideNav>
            </div>
            <div className="twelve wide column">
                <div
                    className={"container"}
                    style={{width: '500px', height:'50vh'}}
                >
                    <h1>{this.props.itinerary.selectedDate}</h1>
                    <div><MapContainer height="70%" width="95%"/></div>
                </div>
                <div><ItineraryList/></div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Itinerary);