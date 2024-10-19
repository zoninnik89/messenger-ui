

class WebSocketService {
    constructor(chatStore, userStore) {
      this.chatStore = chatStore;
      this.userStore = userStore;
      this.ws = null;
    }
  
    connect() {
      const userToken = this.userStore.currentUser.token; // Get the JWT token from the user store
      if (userToken == '') {
        console.error('User should be logged in for WebSocket connection');
        return;
      }
  
      const token = this.userStore.currentUser.token; 

      this.ws = new WebSocket(`ws://localhost:3002/ws`);

      this.ws.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.handleIncomingMessage(message);
      };
  
      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    handleIncomingMessage(message) {
      // Assuming message contains chat ID and message content
      const chat = this.chatStore.chats.find((c) => c.id === message.chat_id);
      if (chat) {
        chat.messages.push(message);
      }
    }
  
    sendMessage(message) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open. Unable to send message.');
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  }
  
  export default WebSocketService;