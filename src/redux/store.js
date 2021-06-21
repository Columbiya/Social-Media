import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { message: "Hi, what's up?", likes: 25 },
                { message: "It's my first post", likes: 30 },
                { message: "It is reaaally interesting experience", likes: 30 },
            ],
            _newPostText: '',

            get newPostText() {
                return this._newPostText;
            },

            set newPostText(value) {
                this._newPostText = value;
            }
        }, //Profile
    
        messagesPage: {
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
            _newMessageText: '',

            get newMessageText() {
                return this._newMessageText;
            },

            set newMessageText(value) {
                this._newMessageText = value;
            }
        }, //Messages
    
        sidebar: [
            {name: 'Nastya'},
            {name: 'Egor'},
            {name: 'Danya'}
        ], //Sidebar
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.messagesPage, action);
        
        this._callSubscriber(store);
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    get state() {
        return this._state;
    },
};

export default store;