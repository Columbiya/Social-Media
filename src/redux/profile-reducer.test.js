import profileReducer, { deletePost } from "./profile-reducer";

let state = {
    posts: [
        { message: "Hi, what's up?", likes: 25, id: 1 },
        { message: "It's my first post", likes: 30, id: 2 },
        { message: "It is reaaally interesting experience", likes: 30, id: 3 },
    ]
};

test('after removing the posts length should be correct', () => {
    let action = deletePost(2);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});