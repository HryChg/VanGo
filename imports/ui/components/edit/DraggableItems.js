import React from 'react';
import {connect} from 'react-redux';
import {updateDraggableItems} from "../../actions/draggableItemsActions";
import {maskString} from "../../../util/util";


class DraggableItems extends React.Component {
    componentDidMount() {
        let eventsFromHomePage = this.props.eventDrawer.savedEvents;
        this.props.updateDraggableItems(eventsFromHomePage);
    }

    onDragStart = (e, index) => {
        this.draggedItem = this.props.draggableItems.editedPath[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    // TODO this might be really computation heavy as it update multiples times while you are dragging on air
    //      Try Console.log to see the update frequency
    onDragOver = index => {
        const draggedOverItem = this.props.draggableItems.editedPath[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let items = this.props.draggableItems.editedPath.filter(item => item !== this.draggedItem);

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
        let items = this.props.draggableItems.editedPath;
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
    return {
        draggableItems: state.draggableItems,
        eventDrawer: state.eventDrawer
    };
};

export default connect(mapStateToProps, {
    updateDraggableItems: updateDraggableItems
})(DraggableItems);


