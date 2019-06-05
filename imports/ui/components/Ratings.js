import React from 'react';
import {connect} from 'react-redux';

class Ratings extends React.Component {
    // http://code.iamkate.com/html-and-css/star-rating-widget/
    render() {
        return (<div>
            <span className="starRating">
              <input id="rating5" type="radio" name="rating" value="5"/>
              <label htmlFor="rating5">5</label>
              <input id="rating4" type="radio" name="rating" value="4"/>
              <label htmlFor="rating4">4</label>
              <input id="rating3" type="radio" name="rating" value="3"/>
              <label htmlFor="rating3">3</label>
              <input id="rating2" type="radio" name="rating" value="2"/>
              <label htmlFor="rating2">2</label>
              <input id="rating1" type="radio" name="rating" value="1"/>
              <label htmlFor="rating1">1</label>
            </span>
            <div className="ui star rating" data-rating="3">Ratings</div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Ratings);
