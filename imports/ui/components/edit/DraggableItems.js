import React from 'react';
import {connect} from 'react-redux';
import "./DraggableItems.css";


class DraggableItems extends React.Component {
    // https://www.freecodecamp.org/news/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780/
    state = {
        items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
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

    render() {
        return (
            <div className="DraggableItems">
                <main>
                    <h3>List of items</h3>
                    <ul>
                        {this.state.items.map((item, idx) => (
                            <li key={item} onDragOver={() => this.onDragOver(idx)}>
                                <div
                                    className="drag"
                                    draggable
                                    onDragStart={e => this.onDragStart(e, idx)}
                                    onDragEnd={this.onDragEnd}
                                >
                                    <label className="dragBtn"> ≡ </label>
                                    <span className="content">{item}</span>
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
    return state;
};

export default connect(mapStateToProps)(DraggableItems);


