// Yelp Business Search Documentation
// https://www.yelp.ca/developers/documentation/v3/business_search

const axios = require('axios');
import {yelpApi} from '../ui/config'

export default class YelpAttractionsApi {
    // EFFECTS: get attraction based on string input of the location
    //          Max returned Result count is 50
    async getTouristAttraction(limit, locationString) {
        try {
            let res = await axios.get('https://api.yelp.com/v3/businesses/search', {
                headers: {
                    'Authorization': `Bearer ${yelpApi}`
                },
                params: {
                    term: 'Tourists Must See List',
                    location: locationString,
                    limit: limit
                }
            });
            return res.data.businesses;
        } catch (err) {
            throw new Error(err);
        }
    }

    // EFFECTS: get attractions based on coordinates. For instance, dtVan is (49.2820, -123.1171)
    //          Max returned Result count is 50
    async getTouristAttractionFromCoord(limit, lat, lng) {
        try {
            let res = await axios.get('https://api.yelp.com/v3/businesses/search', {
                headers: {
                    'Authorization': `Bearer ${yelpApi}`
                },
                params: {
                    term: 'Tourists Must See List',
                    latitude: lat,
                    longitude: lng,
                    limit: limit
                }
            });
            return res.data.businesses;
        } catch (err) {
            throw new Error(err);
        }
    }
}


export const convertBusinessToAttraction = (business) => {
    let attraction = {};
    attraction.name = business.name;
    attraction.start_time = null;
    attraction.end_time = null;
    attraction.price = null;
    attraction.latitude = business.coordinates.latitude;
    attraction.longitude = business.coordinates.longitude;
    attraction.link = business.url;
    attraction.category = business.categories[0].alias;
    attraction.type = 'Attraction';
    attraction.description = null;
    return attraction;
};

export const convertBusinessesToAttractions = (businesses) => {
    let attractions = [];
    for (let business of businesses){
        attractions.push(convertBusinessToAttraction(business))
    }
    return attractions;
};
