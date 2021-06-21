export const updateObjectInArray = (items, itemId, propName, newObjProps) => {
    return items.map(item => {
        if (item[propName] === itemId) {
            return { ...u, ...newObjProps };
        }
        return u;
    });
};