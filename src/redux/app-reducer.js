import { getAuthorizedProfileInfo, getAuthorizedUserProfile } from './auth-reducer';
import { getMyId } from './selectors/auth-selectors';

const SET_INITIALIZATION = 'app/SET_INITIALIZATION';
const SET_ERROR = 'app/SET_ERROR'

let initialState = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialized: true,
            }
        case SET_ERROR:
            return {
                ...state,
                globalError: action.errorState
            }
        default:
            return state;
    }
};

export const setInitialization = () => ({ type: SET_INITIALIZATION });
export const setError = errorState => ({ type: SET_ERROR, errorState });

export const setGlobalError = () => dispatch => {
    dispatch(setError(true));
    setTimeout(() => {
        dispatch(setError(null))
    }, 3000);
};

export const initializeApp = () => async (dispatch, getState) => {
    await dispatch(getAuthorizedProfileInfo())
    const myId = getMyId(getState());

    if (!myId) {
        dispatch(setInitialization());
        return;
    } 

    await dispatch(getAuthorizedUserProfile(myId))
    dispatch(setInitialization());
};

export default appReducer;