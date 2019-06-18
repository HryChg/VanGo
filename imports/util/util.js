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

// TODO
// EFFECTS: toggle an item in the array.
//          If it exist in arr, return a copy of the array without that item
//          If it does not exist in arr, return a copy of the array with that item
export const toggleItemInArray = (array, item) => {
    return []; //stub
};
