const sendMessageType = 'SEND-MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: "Vovan" },
        { id: 2, name: "Egor" },
        { id: 3, name: "Nastya" },
        { id: 4, name: "Danya" },
    ],
    messages: [
        { id: 1, message: "Hi", fromMe: true },
        { id: 2, message: "Hi, what's up?", fromMe: false},
        { id: 3, message: "Yo", fromMe: true},
        { id: 4, message: "Yo", fromMe: false },
        { id: 5, message: "Yo", fromMe: true },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case sendMessageType: {
            let newMessage = {
                id: 6,
                message: action.text,
                fromMe: true,
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.id)
            }
        default:
            return state;
    }
};

export const sendMessage = text => ({ type: sendMessageType, text });
export const deleteMessage = messageId => ({type: DELETE_MESSAGE, id: messageId});

export default dialogsReducer;