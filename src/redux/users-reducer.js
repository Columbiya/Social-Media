import { followAPI, usersAPI } from '../api/api';

const ToggleFollowPerson = "users/TOGGLE-FOLLOW-PERSON";
const SetUsers = "users/SET-USERS";
const HandlePages = "users/HANDLE-PAGES";
const TotalCount = "users/TOTAL-COUNT";
const ToggleIsFetching = "users/TOGGLE-IS-FETCHING";
const ToggleFollowingInProgress = "users/TOGGLE-FOLLOWING-IN-PROGRESS";

let initialState = {
    users: [],
    totalCount: 0,
    page: 1,
    usersPerPage: 4,
    isFetching: false,
    followingInProgress: false,
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ToggleFollowPerson:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: !u.followed
                        };
                    }
                    return {...u};
                }),
            };
        case SetUsers:
            return {
                ...state,
                users: [...action.users],
            };
        case HandlePages:
            return {
                ...state,
                users: [...state.users],
                page: action.currentPage
            }
        case TotalCount:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case ToggleIsFetching:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ToggleFollowingInProgress:
            return {
                ...state,
                followingInProgress: action.isFollowing
            }
        default:
            return state;
    }
}

export const toggleFollow = userId => ({type: ToggleFollowPerson, userId}); //action creator
export const addUsers = users => ({type: SetUsers, users});
export const switchPage = currentPage => ({type: HandlePages, currentPage});
export const setTotalCount = totalCount =>  ({type: TotalCount, totalCount});
export const toggleIsFetching = isFetching => ({type: ToggleIsFetching, isFetching});
export const toggleFollowingInProgress = isFollowing => ({type: ToggleFollowingInProgress, isFollowing});

const followUnfollowFlow = async (dispatch, userId, apiMethod) => {
    dispatch(toggleFollowingInProgress(true));
    let data = await apiMethod(userId);
    dispatch(toggleFollowingInProgress(false));

    if (data.resultCode === 0) {
        dispatch(toggleFollow(userId));
    }
};

export const follow = userId => async dispatch => {//redux-thunk
    followUnfollowFlow(dispatch, userId, followAPI.follow.bind(followAPI));
};

export const unfollow = userId => async dispatch => { //redux-thunk
    followUnfollowFlow(dispatch, userId, followAPI.unfollow.bind(followAPI));
};

export const requestUsers = (usersPerPage, page) => async dispatch => {
    dispatch(switchPage(page));

    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(usersPerPage, page)
    dispatch(toggleIsFetching(false));

    dispatch(setTotalCount(data.totalCount));
    dispatch(addUsers(data.items));
};

export default usersReducer;