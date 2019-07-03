const axios = require('axios');
import {googleMapsApiKey} from '../ui/config'

export default class GooglePlacesApi {
    async getResults(ctrCoordinate, type) {
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
