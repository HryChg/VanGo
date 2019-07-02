const axios = require('axios');
const apiKey = 'dDfY4JOu4vSBJWZabgu-iYx3INycXIhofarhRe7YNahDQVUp9Oub8KDvFTq-lK5y1HdDhnIF8jSxdl1aOQzTmAjkKceyZJXc5nQbkd97glTL-svXmKw3u0Nof00AXXYx';
// https://medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
// https://flaviocopes.com/javascript-sleep/

let monthlyEvents = {};

var year = new Date().getFullYear();
var month = new Date().getMonth();

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function daysInMonth(mth) {
    switch (mth) {
        case 0:
            return 31;
        case 1:
            return 28;
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
            return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
    }
}

async function getEventsInMonth() {
    try {
        let endDay = await daysInMonth(month);
        for (let i = 1; i <= endDay; i++) {
            let dayStart = Date.UTC(year, month, i, 0, 0, 0) / 1000;
            let dayEnd = Date.UTC(year, month, i, 23, 59, 59) / 1000;
            await getEventsInDay(i, dayStart, dayEnd);
            await sleep(1000);
        }
        console.log(monthlyEvents);
    } catch (err) {
        console.log(err);
    }
}

function getEventsInDay(date, start, end) {
    axios.get('https://api.yelp.com/v3/events', {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        params: {
            location: 'Vancouver',
            start_date: start,
            end_date: end,
            limit: 50
        }
    })
        .then((res) => {
            monthlyEvents[date] = res.data.events.map(event => {
                return {
                    category: event.category,
                    cost: event.cost,
                    description: event.description,
                    url: event.event_site_url,
                    id: event.id,
                    free: event.is_free,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    name: event.name,
                    startTime: event.time_start,
                    endTime: event.time_end,
                    location: event.location
                };
            });
        }).catch((err) => {
            console.log(err);
        });
}

getEventsInMonth();