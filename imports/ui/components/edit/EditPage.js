import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";
import SearchBar from "../SearchBar";

class EditPage extends React.Component {
    render() {
        return (
            <div className="ui grid centered">
                <div className="four wide column centered grid">
                    <SideNav>
                        <h2>VanGo</h2>
                        <SearchBar/>

                        <h2>Itinerary for Jan 27, 2019</h2>
                        <DraggableItems/>

                        <br/>

                        <div className="ui  button container">
                            <i className="heart icon"/>
                            Save
                        </div>

                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        className={"container"}
                        style={{width: '500px', height:'80vh'}}
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

export default connect(mapStateToProps)(EditPage);
