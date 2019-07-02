const axios = require('axios');
const apiKey = 'dDfY4JOu4vSBJWZabgu-iYx3INycXIhofarhRe7YNahDQVUp9Oub8KDvFTq-lK5y1HdDhnIF8jSxdl1aOQzTmAjkKceyZJXc5nQbkd97glTL-svXmKw3u0Nof00AXXYx';
// https://medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5

export default getEventsInDay = (date) => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events', {
        headers: {
            'Authorization': `Bearer ${apiKey}`
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
                    category: event.category,
                    price: event.cost,
                    description: event.description,
                    link: event.event_site_url,
                    id: event.id,
                    free: event.is_free,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    name: event.name,
                    start_time: event.time_start,
                    end_time: event.time_end,
                    location: event.location
                };
            });
            console.log(dayEvents);
            return dayEvents;
        }).catch((err) => {
            console.log(err);
        });
}
