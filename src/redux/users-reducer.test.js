import usersReducer, { addUsers, toggleFollow } from "./users-reducer";

let state = {
    users: [{id: 1, followed: false}],
    totalCount: 0,
    page: 1,
    usersPerPage: 4,
    isFetching: false,
    followingInProgress: false,
};

test('toggling following a person should change the correct property', () => {
    let action = toggleFollow(1);
    let newState = usersReducer(state, action);
    expect(newState.users[0].followed).toBe(true);
});

test('setting users should make a new array with the users inside', () => {
    let users = [{id: 1, followed: false}, {id: 1, followed: false}, {id: 1, followed: false}];
    let action = addUsers(users);
    let newState = usersReducer(state, action);
    expect(newState.users.length).toBe(3);
});