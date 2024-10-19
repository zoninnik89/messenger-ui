import { makeAutoObservable, observable } from 'mobx';

class ChatStore {

  /* Expected chat structure

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

*/

  chats = [
    {
      id: '1',
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
      messages: [],
    },
    {
      id: '2',
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

  selectedChatID = null;

  constructor() {
    makeAutoObservable(this);
  }

  addChat(chat) {
    this.chats.push(chat);
  }

  checkChatExists(targetChatID) {
    for (const chat of this.chats) {
      if (chat.id == targetChatID) {
        return true
      }
    }
    return false
  }

  addMessageToChat(id, message) {
    this.chats[id].messages.push(message)
  }

  selectChat(chatID) {
    this.selectedChatID = chatID;
    console.log(this.selectedChatID)
  }
}

const chatStore = new ChatStore();
export default chatStore;