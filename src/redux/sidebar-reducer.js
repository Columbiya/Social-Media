let initialState = [
    {name: 'Nastya', id: 1},
    {name: 'Egor', id: 2},
    {name: 'Danya', id: 3}
];


const sidebarReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default sidebarReducer;