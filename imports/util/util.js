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
