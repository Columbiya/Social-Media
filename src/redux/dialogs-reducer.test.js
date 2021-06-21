import dialogsReducer, { deleteMessage, sendMessage } from "./dialogs-reducer";

let state = {
    messages: [
        { id: 1, message: "Hi", fromMe: true },
        { id: 2, message: "Hi, what's up?", fromMe: false},
        { id: 3, message: "Yo", fromMe: true},
        { id: 4, message: "Yo", fromMe: false },
        { id: 5, message: "Yo", fromMe: true },
    ]
};

test('The text should be correct after adding a message', () => {
    let action = sendMessage('some text');
    let newState = dialogsReducer(state, action);
    expect(newState.messages[5].message).toBe('some text');
});

test('The length of the messages array should be correct after deleting a message', () => {
    let action = deleteMessage(2);
    let newState = dialogsReducer(state, action);
    expect(newState.messages.length).toBe(4);
});