import React, { Component } from 'react';
import "./Sidebar.css";

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapse_sidebar

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            placeholder: ["event1", "event2", "event3"]
        }
    }

    loEA = dummy.map(ea => {
        return (
            <input type="checkbox">{ea}</input>
        );
    });

    closeNav() {
        $("#mySidebar").css("width", "0");
        $('main').css("marginRight", "0");
      };

    render() {
        return (
            <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" class="closebtn" onclick="this.closeNav">×</a>
                <h2>Selected</h2>
                <form action="">
                    {loEA}
                    <button>Delete</button>
                </form>
            </div>
        );
    }
}

export default Sidebar