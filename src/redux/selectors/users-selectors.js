import { createSelector } from "reselect";

export const getUsers = state => {
    return state.usersPage.users;
}

const getUsersReselect = createSelector(getUsers, users => { // reselector библиотека reselect
    return users.filter(u => true);
});

export const getUsersPerPage = state => {
    return state.usersPage.usersPerPage;
}

export const getPage = state => {
    return state.usersPage.page;
}

export const getIsFetching = state => {
    return state.usersPage.isFetching;
}

export const getTotalCount = state => {
    return state.usersPage.totalCount;
}

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress;
}