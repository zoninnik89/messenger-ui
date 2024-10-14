import { makeAutoObservable } from 'mobx';

class ChatStore {
  chats = [];
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