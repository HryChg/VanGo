const axios = require('axios');
import {googleMapsApiKey} from '../ui/config'

export default class GooglePlacesApi {
    async getNearbyPlaces(ctrCoordinate, type) {
        let apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${ctrCoordinate.lat},${ctrCoordinate.lon}&radius=1500&types=${type}&key=${googleMapsApiKey}`;
        try {
            const response = await axios.get(apiString);
            return response.data.results;
        } catch (err) {
            console.log(err);                    //Axios entire error message
            console.log(err.response.data.error) //Google API error message
        }
    }


    async convertPlaceToAttraction(place) {
        let apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${ctrCoordinate.lat},${ctrCoordinate.lon}&radius=1500&types=${type}&key=${googleMapsApiKey}`;
        try {
            const response = await axios.get(apiString);
            return response.data.results;
        } catch (err) {
            console.log(err);                    //Axios entire error message
            console.log(err.response.data.error) //Google API error message
        }
    }
}


export const convertPlaceToAttraction = (place) => {
    let attraction = {};
    attraction.name = place.name;
    attraction.start_time = null;
    attraction.end_time = null;
    attraction.price = null;
    attraction.latitude = place.geometry.location.lat;
    attraction.longitude = place.geometry.location.lng;
    attraction.link = place.website;
    attraction.category = place.types[0];
    attraction.type = 'Attraction';
    attraction.description = null;
    return attraction;
};

export const convertPlacesToAttractions = (places) => {
    let attractions = [];
    for (let place of places){
        attractions.push(convertPlaceToAttraction(place))
    }
    return attractions;
};
