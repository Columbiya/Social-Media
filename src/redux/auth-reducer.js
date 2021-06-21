import { FORM_ERROR } from 'final-form';
import { authAPI, profileAPI, securityAPI } from '../api/api';
import { getMyId } from './selectors/auth-selectors';

const authorizeUser = 'auth/AUTHORIZE-USER';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';
const GET_LOGGED_IN_USER_PROFILE = 'auth/GET_LOGGED_IN_USER_PROFILE';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuthorized: false,
    captchaUrl: null, //if null then no captcha required
    profile: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authorizeUser:
            return {
                ...state,
                ...action.payload,
            }
        case GET_LOGGED_IN_USER_PROFILE:
            return {
                ...state, 
                profile: action.profile
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
};

export const setAuthorization = (id, login, email, isAuthorized) => ({ type: authorizeUser, payload: { id, login, email, isAuthorized } });
export const setCaptcha = captchaUrl => ({ type: GET_CAPTCHA_URL, captchaUrl });
export const setLoggedInUserProfile = profile => ({type: GET_LOGGED_IN_USER_PROFILE, profile});

export const getAuthorizedProfileInfo = () => async dispatch => {
    const data = await authAPI.authorize()
    if (data.resultCode === 0) {
        const { id, login, email } = data.data;

        dispatch(setAuthorization(id, login, email, true));
    }
};

export const getAuthorizedUserProfile = userId => async dispatch => {
    const data = await profileAPI.getProfile(userId);

    dispatch(setLoggedInUserProfile(data));
};

export const login = (email, password, rememberMe, captcha) => async (dispatch, getState) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        await dispatch(getAuthorizedProfileInfo());
        dispatch(getAuthorizedUserProfile(getMyId(getState())))
        dispatch(setCaptcha(null));
    }
    else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        return {
            [FORM_ERROR]: data.messages[0]
        }
    }
};

export const logout = () => async dispatch => {
    const data = await authAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthorization(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async dispatch => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptcha(captchaUrl));
};

export default authReducer;