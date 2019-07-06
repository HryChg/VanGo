// Testing Tutorial
// https://www.youtube.com/watch?v=ISuVRl21wUs

// Meteor + React Testing
// https://www.meteor.com/tutorials/react/testing

// Must import the individual methods if performing unit testing
// https://forums.meteor.com/t/how-to-test-meteor-methods/21710/4

// Visit http://localhost:3000 to see the test result on web browser

import chai from 'chai';
import './EventDrawerApi';
import EventDrawerApi, {getAnonAccountID} from './EventDrawerApi';



if (Meteor.isServer){
    describe("EventDrawerApis", function () {
        it("should create or get the id of anon account", async function () {
            let res = await getAnonAccountID();
            let expected = await EventDrawerApi.findOne({_id: res});
            chai.assert.equal(res, expected._id);
            chai.assert.equal("anon", expected.user)
        });

        it ("should create or get the id of a user account", async function () {
            // create an account in the empty database

            // loging to that account

            // Meteor Method login form Shirley

            chai.assert.fail();
        })
    });

}





