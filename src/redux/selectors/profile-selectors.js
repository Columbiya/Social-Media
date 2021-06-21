export const getUserProfile = state => {
    return state.profilePage.profile;
};

export const getUserStatus = state => {
    return state.profilePage.status;
};

export const getMyPosts = state => {
    return state.profilePage.posts;
};

export const getIsStatusFetching = state => {
    return state.profilePage.isStatusFetching;
};