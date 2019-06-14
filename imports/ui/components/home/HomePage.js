import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import EventDrawer from "./EventDrawer";


class HomePage extends React.Component {
    toggleEventDrawer = () => {
        $('.ui.right.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'dimPage', false)
            .sidebar('toggle');
    };


    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"} style={{padding: '8px'}}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <SearchBar/>
                            <DatePicker/>
                            <br/>
                            <EventFilter/>

                            <div className="select-button">
                                <button
                                    className="ui pink button"
                                    id="select-button"
                                    onClick={this.toggleEventDrawer}
                                >Show Current Selection
                                </button>
                            </div>
                        </div>
                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        style={{height: '90vh'}}
                    >
                        <MapContainer
                            width={'95%'}
                            height={'95%'}
                        />
                    </div>
                </div>

                <EventDrawer/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(HomePage);
