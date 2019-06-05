import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";


class HomePage extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <h2>VanGo</h2>
                        <SearchBar/>
                        <DatePicker/>
                        <EventFilter/>

                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        className={"container"}
                        style={{width: '500px', height:'90vh'}}
                    >
                        <MapContainer
                            width={'95%'}
                            height={'95%'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(HomePage);
