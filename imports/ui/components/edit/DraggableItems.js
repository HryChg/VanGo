import React from 'react';
import {connect} from 'react-redux';
import {updateDraggableItems} from "../../actions/draggableItemsActions";
import {VanGoStore} from "../../../../client/main";
import {maskString} from "../../../util/util";


class DraggableItems extends React.Component {
    // state = {
    //     items: ["🍰 EventA", "🍩 EventB", "🍎 AttractionC", "🍕 AttractionD", "🐵 AttractionE", "🥎 AttractionF"]
    // };

    componentDidMount() {
        let eventsFromHomePage = VanGoStore.getState().eventDrawer.savedEvents;
        this.props.updateDraggableItems(eventsFromHomePage);
    }

    onDragStart = (e, index) => {
        this.draggedItem = VanGoStore.getState().draggableItems.editedPath[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = VanGoStore.getState().draggableItems.editedPath[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let items = VanGoStore.getState().draggableItems.editedPath.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        items.splice(index, 0, this.draggedItem);
        this.props.updateDraggableItems(items);
    };

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    displayItems = (items) => {
        return items.map((item, idx) => (
            <li key={item.id} onDragOver={() => this.onDragOver(idx)}>
                <div
                    className="drag"
                    draggable
                    onDragStart={e => this.onDragStart(e, idx)}
                    onDragEnd={this.onDragEnd}
                >
                    <div className="ui label blue DraggableItem">
                        <i className="arrows alternate vertical icon"/>
                        <span className="content">{maskString(item.name, 23)}</span>
                    </div>
                </div>
            </li>
        ));
    };

    /*
    * The content inside the <main> element
    * should be unique to the document.
    * */
    render() {
        let items = VanGoStore.getState().draggableItems.editedPath;
        if (items) {
            return (
                <div className="DraggableItems">
                    <main>
                        <ul>
                            {this.displayItems(items)}
                        </ul>
                    </main>
                </div>
            );

        }

        return (
            <div className="DraggableItems">
                NO ITEMS SAVED IN EVENT DRAWER. <br/>
                Please go back to homepage and save your events.
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {draggableItems: state.draggableItems};
};

export default connect(mapStateToProps, {
    updateDraggableItems: updateDraggableItems
})(DraggableItems);


