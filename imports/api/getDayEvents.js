const axios = require('axios');
let yelpApiKey = Meteor.settings.yelpApiKey;
// https://medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5

export default async function getEventsInDay(date) {
    return axios.get('https://api.yelp.com/v3/events', {
        headers: {
            'Authorization': `Bearer ${yelpApiKey}`
        },
        params: {
            location: 'Vancouver',
            start_date: Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0, 0, 0) / 1000,
            end_date: Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                23, 59, 59) / 1000,
            limit: 50
        }
    })
        .then((res) => {
            let dayEvents = {};
            dayEvents.events = res.data.events.map(event => {
                return {
                    name: event.name,
                    start_time: event.time_start,
                    end_time: event.time_end,
                    price: event.is_free ? 0 : event.cost,
                    free: event.is_free,
                    location: event.location,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    link: event.event_site_url,
                    category: event.category,
                    type: 'Event',
                    description: event.description
                };
            });
            console.log('got events for: ' + date);
            return dayEvents;
        }).catch((err) => {
            console.log(err);
        });
}
