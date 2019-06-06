# VanGo
### Project Description:
VanGo was created to aid locals and tourists in exploring the city by showing them local events and nearby attractions. We will be storing event information, list of itineraries, and user information. Using this data, users will be able to plan and fill their itineraries with events and attractions, generate a path between all their events and attractions, and create a user account to save their itineraries. Some additional functionality we can add are an event filter based on type and cost, Google sign-in to save data to itinerary information, the ability to detect time conflicts between events, the ability to display projected weather, and the ability to display areas with high crime activity. 

### Project Task Requirements:
#### Minimal Requirements (3-5) (will definitely complete):
- User interface
- Web-scraping for events
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

#### Breakdown on Tasks (What we can do right now)
- Create HTML and CSS static website for now (Four Pages)
    - Events Today (Main page)
        - Google Map Display
        - DatePicker Widget
        - Button
    - Select Neighborhood Activities
        - Google Map Display
        - Additional Markers for Neighboring Events
        - Filters on event categories
    - Itineraries Generation
        - Google Maps Path Generation
        - Saving path as an json file 
        - Itinerary view (location order can be changed)
    - User view (saved itineraries)
        - Convert JSON file to HTML
        - List view on all Itineraries
        - Additional features: add, edit, delete on Itineraries
    - Each of these pages will require a navigation bar
- Scrape websites for details
    - Find the attributes in the HTML page:
        - DailyHive
        - Georgia Strait
        - ToDoCanada
        - Eventbrite
    - Save name, location, date, time, price, category, additional details as JSON object


### Acknowledgements, References and Resources:
#####Styling
Semantic UI
https://semantic-ui.com/modules/modal.html

#####Home Page
React Calendar
https://www.npmjs.com/package/react-calendar

#####React Google Map
React Google Map API Tutorial
https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

#####Login and Registration Redux
React + Redux - User Registration and Login Tutorial & Example
https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example