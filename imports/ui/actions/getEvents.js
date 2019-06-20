const axios = require('axios');
const apiKey = 'dDfY4JOu4vSBJWZabgu-iYx3INycXIhofarhRe7YNahDQVUp9Oub8KDvFTq-lK5y1HdDhnIF8jSxdl1aOQzTmAjkKceyZJXc5nQbkd97glTL-svXmKw3u0Nof00AXXYx';
// https://medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC

let monthlyEvents = {};

var year = new Date().getFullYear();
var month = new Date().getMonth();

function daysInMonth(mth){
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
    // limit 5QPS
    let endDay = await daysInMonth(month);
    for (let i = 1; i <= endDay; i++) {
        let dayStart = Date.UTC(year, month, i, 0, 0, 0)/1000;
        let dayEnd = Date.UTC(year, month, i, 23, 59, 59)/1000;
        await setTimeout(getEventsInDay, 1000, i, dayStart, dayEnd);
    }
    console.log(monthlyEvents);
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
            // returns obj w/ events attrib: array of events
            // console.log(res.data);
            monthlyEvents[date] = res.data;
            // return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

getEventsInMonth();

// setTimeout(getEventsInDay, 1000, 1560988800, 1561075199);
