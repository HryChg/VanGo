import React from 'react';

export default class Toggle extends React.Component {

    // EFFECTS: handle onClick and sent data to the parent component
    handleOnclick = () =>{
        this.props.sendData(this.props.content);
    };

    render() {
        return(<div>
            <div className={"ui toggle checkbox"}>
                <input type={"checkbox"} name={"public"} onClick={this.handleOnclick}/>
                    <label>{this.props.content}</label>
            </div>
        </div>);
    }
}
