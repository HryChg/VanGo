// Reference:
// - Getting Latitude and Longitude Center: https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb

// EFFECTS: return true if listA contains every element in listB
export const containAll = (listA, listB) => {
    let result = true;
    for (let item of listB){
        result = listA.includes(item);
        if (result === false){
            return result;
        }
    }
    return result;
};


// EFFECTS: return true if listA container one of the elements in listB
export const containOneOf = (listA, listB) => {
    let result = false;
    for (let item of listA){
        result = listB.includes(item);
        if (result === true){
            return true;
        }
    }
    return result;
};

// REQUIRES: categoryGroup is a list
// EFFECTS: toggle category in the array
//          If it exist in arr, return a copy of the array without that category
//          If not exist in arr, return a copy of the array with that category
//          Note category's index in the array is not preserved
export const toggleCategoryInArray = (originalArray, categoryGroup) => {
    let newArray = null;
    if (containOneOf(originalArray, categoryGroup)) {
        newArray = originalArray.filter((category) => {
            return !categoryGroup.includes(category);
        });
    } else {
        newArray = originalArray.concat(categoryGroup);
    }
    return newArray;
};

// EFFECTS: return a copy of the str up to `charCount` characters, mask the rest with '...'
export const maskString = (str, charCount) => {
    if (str.length > charCount){
        return str.substring(0, charCount) + '...';
    }
    return str;
};

// EFFECTS: converts date to XX:XX AM or XX:XX PM
export const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// EFFECTS: convert array of events to an array of [lat, lon]
export const getLatLonCenterOfEvents = (events) => {
    if (!events) return null;
    let latlons = events.map(item => [item.latitude, item.longitude]);
    let center = getLatLonCenter(latlons);
    return center;
}

// EFFECTS: return the center latitude and longitude,
//          given a list of latitudes and longitudes
export const getLatLonCenter = (listOfLatLons) => {
    if (listOfLatLons == null) return null;
    if (listOfLatLons.length === 1) {
        let latLon = listOfLatLons[0];
        return {lat: latLon[0], lng: latLon[1]};
    }
    
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;
    
    for (let latlon of listOfLatLons) {
        let latitude = latlon[0] * Math.PI / 180;
        let longitude = latlon[1] * Math.PI / 180;
    
        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);
    }
    
    let total = listOfLatLons.length;
    
    x = x / total;
    y = y / total;
    z = z / total;
    
    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);
    let center = {lat: centralLatitude * 180 / Math.PI, 
                  lng: centralLongitude * 180 / Math.PI}
    return center;
}

// REQUIRES: objects in list must contain attributes: date, name
// EFFECTS: sorts given itinerary list by date, then name
export const sortByDateName = (items) => {
    if (!Array.isArray(items) || !items.length) {
        return [];
    }
    let sortedItems = items.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        if (dateA.getTime() === dateB.getTime()) {
            return a.name < b.name ? -1 : (a.name > b.name ? 1: 0);
        }
        return dateA - dateB;
    });
    return sortedItems;
}

// EFFECTS: returns today's date with 00:00:00 time
export const getToday = () => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}