import { profileAPI } from '../api/api';
import { FORM_ERROR } from 'final-form';
import { idGenerator } from '../utils/id-generator';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const UPDATE_PHOTO = 'profile/UPDATE_PHOTO';
const SET_STATUS_FETCHING = 'profile/SET_STATUS_FETCHING';

const generator = idGenerator;

let initialState = {
    posts: [
        { message: "Hi, what's up?", likes: 25, id: generator.next().value },
        { message: "It's my first post", likes: 30, id: generator.next().value },
        { message: "It is reaaally interesting experience", likes: 30, id: generator.next().value },
    ],
    profile: null,
    status: '',
    isStatusFetching: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                message: action.text,
                likes: 0,
                id: generator.next().value
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case UPDATE_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }
        case SET_STATUS_FETCHING:
            return {
                ...state,
                isStatusFetching: action.isStatusFetching
            }
        default:
            return state;
    }
};

export const addPost = text => ({ type: ADD_POST, text });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_STATUS, status });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const updatePhoto = photos => ({ type: UPDATE_PHOTO, photos });
export const setStatusFetching = isStatusFetching => ({ type: SET_STATUS_FETCHING, isStatusFetching } );

export const getProfile = userId => async dispatch => { // redux-thunk
    dispatch(setUserProfile(null));

    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};

export const getStatus = id => async dispatch => {
    let status = await profileAPI.getStatus(id);
    dispatch(setStatus(status))
};

export const updateStatus = status => async dispatch => {
    let response =  await profileAPI.updateStatus(status);

    if (response.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = photo => async dispatch => {
    let response =  await profileAPI.updatePhoto(photo);

    if (response.data.resultCode === 0) {
        dispatch(updatePhoto(response.data.data.photos));
    }
};

export const updateProfile = profile => async (dispatch, getState) => {
    let response = await profileAPI.updateProfile(profile);

    if (response.resultCode === 0) {
        dispatch(setUserProfile(profile));
    }
    else {
        return {
            [FORM_ERROR]: 'Invalid url in the contacts. Try again'
        }
    }
};

export default profileReducer;