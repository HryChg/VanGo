// const initialState = 
//     { itinerary: [
//         {id: 1, name: "Event 1", location: "Location 1", address: "Address 1", date: "August 11, 2019"}, 
//         {id: 2, name: "Event 2", location: "Location 2", address: "Address 2", date: "August 12, 2019"},
//         {id: 3, name: "Event 3", location: "Location 3", address: "Address 3", date: "August 13, 2019"}], 
//     selectedDate: "August 9, 2019" };

export class Itinerary {
    constructor(events, date) {
        this.events = events;
        this.date = date;
        this.key = date;
    }
}

export class Event {
    constructor(key, name, address, date, start_time, end_time, url, price) {
        this.key = key;
        this.name = name;
        this.address = address;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.url = url;
        this.price = price;
    }
}


let event1 = new Event(1, "Super Fun Final Exam", "111 1st Street", "Jan 5, 2019", "1:25PM", "4:00PM", "www.fakeaddress.com", "Free");
let event2 = new Event(2, "Hack-your-brain", "222 2nd Street", "Jan 5, 2019", "5:00PM", "6:00PM", "www.hackthis.com", "$25");
let event3 = new Event(3, "Some Party", "333 3rd Street", "Jan 5, 2019", "5:00PM", "8:00PM", "www.make-a-party.com", "$5");
let event4 = new Event(4, "George's House", "444 4th Street", "Jan 8, 2019", "9:00AM", "4:00PM", "N/A", "Free");
let event5 = new Event(5, "House of Sleep", "555 5th Street", "Jan 8, 2019", "12:25PM", "4:00PM", "www.oneday.com", "an arm and a leg");
let itinerary1 = new Itinerary("Jan 5, 2019", [event1, event2, event3], "Jan 5, 2019");
let itinerary2 = new Itinerary("Jan 8, 2019", [event4, event5], "Jan 8, 2019");
const itineraries = [itinerary1, itinerary2];
let initialState = { itineraries, selectedDate: "Jan 5, 2018" };

export default function ItineraryReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case 'SELECT_DATE':
            newState = Object.assign({}, state, selectedDate = action.payload);
            return newState;
        default:
            return state;
    }
}