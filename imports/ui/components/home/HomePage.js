import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import SearchBar from "../SearchBar";
import DatePicker from "./DatePicker";
import EventFilter from "./EventFilter";
import MapContainer from "../MapContainer";
import {Link} from "react-router-dom";
import $ from 'jquery';
import CurrentSelection from "./CurrentSelection";




class HomePage extends React.Component {




    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"} style={{padding: '8px'}}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <SearchBar/>
                            <DatePicker/>
                            <EventFilter/>




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

                <CurrentSelection/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(HomePage);
