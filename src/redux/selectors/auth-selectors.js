export const getIsAuthorized = state => {
    return state.auth.isAuthorized;
};

export const getMyId = state => {
    return state.auth.id;
};

export const getCaptcha = state => {
    return state.auth.captchaUrl;
};

export const getLogin = state => {
    return state.auth.login;  
};

export const getAuthorizedUserProfilePhoto = state => {
    return state.auth.profile?.photos.large;
};

export const getLoggedInUserProfile = state => {
    return state.auth.profile;
};