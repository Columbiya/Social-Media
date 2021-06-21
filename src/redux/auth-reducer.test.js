import authReducer, { setAuthorization, setLoggedInUserProfile } from "./auth-reducer";

let state = {
    id: null,
    login: null,
    email: null,
    isAuthorized: false,
    userProfile: null,
};

test('logging in should set the data correctly', () => {
    let action = setAuthorization(1, 'ema', 'email@mail.ru', true);
    let newState = authReducer(state, action);
    expect(newState.login).toBe('ema');
});

test('getting user profile should change the profile', () => {
    let profile = {
        login: 'ema',
        email: 'email@mail.ru',
        image: null
    };

    let action = setLoggedInUserProfile(profile);
    let newState = authReducer(state, action);
    expect(newState.profile).toBe(profile);
});