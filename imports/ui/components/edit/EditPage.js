import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import SearchBar from "../SearchBar";

class EditPage extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideNav>
                        <div className={"container"}>
                            <h2 className={"ui header"}>VanGo</h2>
                            <h2 className={"ui header"}>Edit Itinerary for <br/>Jan 27, 2019 </h2>
                            <DraggableItems/>
                            <div className={"container"}>
                                <button className="fluid ui button">
                                    <i className="heart icon"/>
                                    Save
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
            </div>
        );
    }
}

// TODO What do I return?
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(EditPage);
