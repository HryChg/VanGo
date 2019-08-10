# VanGo
### Project Summary:
VanGo is an itinerary planner for locals and tourists who want to discover events and attractions in Vancouver. Users can find information on events and attractions, organize their plans, and save or share them to better explore the city.

### Project Details:
VanGo was created to aid locals and tourists in exploring the city by showing them local events and nearby attractions. In comparison to other itinerary apps, VanGo integrates attractions and events all in one place. We will be storing event information, list of itineraries, and user information. Using this data, users will be able to plan and fill their itineraries with events and attractions, generate a path between all their events and attractions, and create a user account to save their itineraries. Some additional functionality we can add are an event filter based on type and cost, Google sign-in to save data to itinerary information, the ability to detect time conflicts between events, the ability to display projected weather, and the ability to display areas with high crime activity.

### Project Task Requirements:
#### Minimal Requirements (3-5) (will definitely complete):
- User interface
- Web-scraping for events
    - Changed to retrieving data from Yelp API
- Bookmark/star/add interested events to itinerary
- Pop-up (or side-bar) for each event with its name, location, time and link for details
- Share itinerary with self/others

#### Standard Requirements (3-7) (most likely complete):
- Save itinerary for future
- Add calendar to be able to choose future dates
- Generate path
- Show multiple itineraries/plans on a single page
- Create user account to save data
- Edit/delete plans

#### Stretch Requirements (2-3) (hope to complete 1):
- Filter events at main page
- Be able to detect time conflicts
- Be able to see dangerous areas (high crime)
- Show weather/temperature for the day
- Sign in with Google, save data to Google account/calendar

We were able to complete all of our minimal and standard goals and one of our stretch goals which was to add filtering. In the future, we'd like to be able to detect time conflicts between events and add social media sign-in. Most of all, we would like to extend functionality to other major cities.


### Contributions
##### Harry Chuang: 
- Google Maps Integration
- Mailgun Integration
- UI for Home and Edit Page (React/Redux)
- Setting up Mongo Collections for Events
##### Mary Datan: 
- Getting event data through Yelp API
- PDF generation
- Setting up Mongo Collections for Events
##### Shirley Bi:
- Meteor Accounts API - Login/Registration
- General UI and UI for Itinerary Page and Login/Registration Page (React/Redux)
- Setting up Mongo Collections for Itineraries
- User Testing

As a team, on top of using the technologies introduced in our class: HTML/CSS/Javascript, React, Redux, NodeJS, Meteor, MongoDB and Heroku for Release Engineering, we also integrated many external APIs to create a seamless project that integrates both events and attractions in Vancouver into a simple-to-use itinerary planner.  

### Challenges
##### Getting the Event Data
Our initial plan to scrape websites for events was changed since other websites either had terms of conditions that did not allow for scraping or the data from the websites had inconsistent formatting (i.e. event dates were strings in different formats which did not allow us to get the correct times for events). We had to adapt our plans by using Yelp's API to get our events instead.
##### Throttling
We learnt that Meteor and Redux do not interact well together. We used Meteor's withTracker which was tracking data in the database, so whenever we updated the database (like fetching the event and attraction data using Yelp's API and storing it), the map would re-render each time causing a lot of throttling. This was fixed by removing withTracker from the client, and creating Meteor methods to store the data in redux to decouple the client and the database.
##### Current Events Database
When we deployed the app, we realized that there was an issue with the events being rendered on-screen when multiple users were using the app simultaneously. One of us would select a date and the other would get the markers for that particular date. We realized the cause was due to the events being stored and fetched from a single database where multiple users were all manipulating the same data. This was fixed by adding a redux store for the events retrieved for a selected date so that each user had their own state instead of sharing one. In the future, we would like to store all the events in the database per call to reduce the number of API calls and effectively speed up performance. We learnt the importance of where to place the data as it not only affects the time to retrieve the data, but also who has access to the data.
##### API Documentation
As our project involved many APIs such as google-maps-react and Meteor Accounts, our team came across insufficient documentation of how to use certain features of the API. To overcome this, we often had to read the code and look through existing issues to search for answers.


### Acknowledgements, References and Resources:
##### Styling
Semantic UI
https://semantic-ui.com/modules/modal.html

Marker Icons
https://icons8.com/
https://img.icons8.com/color/48/000000/compact-camera.png

##### Navigation Bar
React-Router Quick Start
https://reacttraining.com/react-router/web/guides/quick-start

##### Home Page
React Calendar
https://www.npmjs.com/package/react-calendar

Debug Tool: Tracing why a react component is re-rendering
https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering/41005168

##### React Google Map
React Google Map API Tutorial
https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

Zoom out Google maps to fit all the markers
https://github.com/fullstackreact/google-maps-react/issues/335#issuecomment-487174836 

Getting the Center Longitude and Latitude
https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb

##### Login and Registration Redux
React + Redux - User Registration and Login Tutorial & Example
https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
Adding User Accounts & Adjusting Permissions
https://www.youtube.com/watch?v=eNxuaTGq4Qk
Meteor User Accounts
https://github.com/meteor-useraccounts/core/blob/master/Guide.md


##### Yelp Api
https://medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5

##### Draggable List
https://www.freecodecamp.org/news/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780/
github link https://github.com/siffogh/drag-and-drop-article

##### Connecting Itinerary Page with Meteor and Redux
https://forums.meteor.com/t/solved-meteor-1-3s-createcontainer-and-redux-dispatch-event-handlers-etc/20092/9

##### External Libraries Used
- google-maps-react
- react-calendar
- accounts-password
- accounts-google
- service-configuration
- react-semantic-ui-range
- jsPDF

