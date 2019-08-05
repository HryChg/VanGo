import React from 'react';
import {connect} from 'react-redux';
import {updateDraggableItems, updateEventDrawer} from "../../actions/draggableItemsActions";
import {maskString} from "../../../util/util";


class DraggableItems extends React.Component {
    componentDidMount() {
        this.props.updateEventDrawer();
    }
    // EFFECTS: if editing returns selected itinerary items, otherwise returns unsaved items
    selectItems() {
        let items;
        if (this.props.editing) {
            let ready = this.props.draggableItems.itineraryEdit;
            items = ready? ready.items : [];
        } else {
            items = this.props.draggableItems.items;
        }
        return items;
    }

    // EFFECTS: Extract the data of the dragged HTML element to class and set the image being dragged on the mouse
    onDragStart = (e, index) => {
        let items = this.selectItems();
        this.draggedItem = items[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    // TODO this might be really computation heavy as it update multiples times while you are dragging on air
    //      Try Console.log to see the update frequency
    // EFFECTS: Continually update the the item order according to the location of the draggedOver Item
    onDragOver = index => {
        let items = this.selectItems();
        const draggedOverItem = items[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let newItems = items.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        newItems.splice(index, 0, this.draggedItem);
        this.props.updateDraggableItems(newItems, this.props.editing);
    };

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    displayItems = (items) => {
        return items.map((item, idx) => (
            <li key={item._id} onDragOver={() => this.onDragOver(idx)}>
                <div
                    className="drag"
                    draggable
                    onDragStart={e => this.onDragStart(e, idx)}
                    onDragEnd={this.onDragEnd}
                >
                    <div className="ui label red DraggableItem">
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
        let items = this.selectItems();
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
        // TODO: Loading feature
        return (
            <div className="DraggableItems">
                NO ITEMS SAVED IN EVENT DRAWER. <br/>
                Please go back to homepage and save your events.
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        draggableItems: state.draggableItems,
        editing: state.itineraryStore.editing,
    };
};

export default connect(mapStateToProps, {
    updateDraggableItems,
    updateEventDrawer,
})(DraggableItems);


