import { makeAutoObservable } from 'mobx';

class ChatStore {
  chats = [
    { id: 1, name: 'Alice', messages: ['Hi!', 'How are you?'] },
    { id: 2, name: 'Bob', messages: ['Hey!', 'What’s up?'] },
  ];
  selectedChat = null;

  constructor() {
    makeAutoObservable(this);
  }

  addChat(chat) {
    this.chats.push(chat);
  }

  selectChat(chat) {
    this.selectedChat = chat;
  }
}

const chatStore = new ChatStore();
export default chatStore;