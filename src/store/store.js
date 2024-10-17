import { makeAutoObservable } from 'mobx';

class ChatStore {
  currentUser = {
    id: 2, // The ID for the current logged-in user
    name: 'You',
    avatar: 'https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-380.jpg',
  };

  chats = [
    {
      id: 1,
      name: 'Chat with Bob',
      participants: [
        {
          id: 1,
          name: 'Bob',
          avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
        },
        {
          id: 2,
          name: 'You',
          avatar: 'https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-380.jpg',
        },
      ],
      messages: [
        {
          text: 'Hello!',
          sender: {
            id: 1,
            name: 'Bob',
            avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
          },
          time: '12:34 PM',
        },
        {
          text: 'Hey hey!',
          sender: {
            id: 2,
            name: 'You',
            avatar: 'https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-380.jpg',
          },
          time: '12:44 PM',
        },
      ],
    },
    {
      id: 2,
      name: 'Chat with Jill',
      participants: [
        {
          id: 3,
          name: 'Jill',
          avatar: 'https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-380.jpg',
        },
        {
          id: 2,
          name: 'You',
          avatar: 'https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-380.jpg',
        },
      ],
      messages: [],
    },
  ];

  selectedChat = null;

  constructor() {
    makeAutoObservable(this);
  }

  sendMessage(message) {
    if (this.selectedChat) {
      this.selectedChat.messages.push(message);
    }
  }

  addChat(chat) {
    this.chats.push(chat);
  }

  selectChat(chat) {
    this.selectedChat = chat;
    console.log(this.selectedChat)
  }
}

const chatStore = new ChatStore();
export default chatStore;