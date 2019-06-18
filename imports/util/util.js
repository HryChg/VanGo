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


// EFFECTS: toggle an item in the array
//          If it exist in arr, return a copy of the array without that item
//          If not exist in arr, return a copy of the array with that item
//          Note item's index in the array is not preserved
export const toggleItemInArray = (originalArray, item) => {
    let newArray = null;
    if (originalArray.includes(item)) {
        newArray = originalArray.filter((category) => {
            return category !== item
        });
    } else {
        newArray = [...originalArray, item];
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
