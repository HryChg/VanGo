import React from 'react';
import {connect} from 'react-redux';
import SideNav from "../SideNav";
import MapContainer from "../MapContainer";
import DraggableItems from "./DraggableItems";

class EditPage extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column centered grid">
                    <SideNav>
                        <h2>Itinerary</h2>
                        <DraggableItems/>


                    </SideNav>
                </div>
                <div className="twelve wide column">
                    <div
                        className={"container"}
                        style={{width: '500px', height:'100vh'}}
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
