// EFFECTS: return true if listA contains every element in listB
import {VanGoStore} from "../../client/main";

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