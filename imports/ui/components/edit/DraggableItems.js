import React from 'react';
import {connect} from 'react-redux';
import {updateEditedItem} from "../../actions/draggableItemsActions";


class DraggableItems extends React.Component {
    state = {
        items: ["🍰 EventA", "🍩 EventB", "🍎 AttractionC", "🍕 AttractionD", "🐵 AttractionE", "🥎 AttractionF"]
    };

    onDragStart = (e, index) => {
        this.draggedItem = this.state.items[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.state.items[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let items = this.state.items.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        items.splice(index, 0, this.draggedItem);

        this.setState({ items });
    };

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    /*
    * The content inside the <main> element
    * should be unique to the document.
    * */

    render() {
        return (
            <div className="DraggableItems">
                <main>
                    <ul className={""}>
                        {this.state.items.map((item, idx) => (
                            <li key={item} onDragOver={() => this.onDragOver(idx)}>
                                <div
                                    className="drag"
                                    draggable
                                    onDragStart={e => this.onDragStart(e, idx)}
                                    onDragEnd={this.onDragEnd}
                                >


                                    <div className="ui label huge blue">
                                        <label className="dragBtn"> ≡ </label>
                                        <span className="content">{item}</span>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {draggableItems: state.draggableItems};
};

export default connect(mapStateToProps, {
    updateEditedItem: updateEditedItem
})(DraggableItems);


