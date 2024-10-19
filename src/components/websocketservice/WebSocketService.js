

class WebSocketService {
    static instance = null;

    constructor(chatStore, userStore) {
        if (WebSocketService.instance) {
            return WebSocketService.instance; // Ensure only one instance exists
          }
        this.chatStore = chatStore;
        this.userStore = userStore;
        this.ws = null;
        this.isConnected = false;
        WebSocketService.instance = this;
    }
  
    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('WebSocket connection already exists.');
            return; // Avoid reconnecting if already connected
          }

        const userToken = this.userStore.currentUser.token; // Get the JWT token from the user store
        if (!userToken) {
            console.error('User must be logged in to establish WebSocket connection');
            return;
        }

        this.ws = new WebSocket(`ws://localhost:3002/ws?token=${userToken}`);

        this.ws.onopen = () => {
            this.isConnected = true;
            console.log(`WebSocket connection established, status is ${this.isConnected}`);
        };
    
        this.ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const message = JSON.parse(event.data);
            if (message.type) {
              console.log('ping from backend received')
            } else {
              this.handleIncomingMessage(message);
            }
        };
    
        this.ws.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket connection closed');
        };
    
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
  
    handleIncomingMessage(message) {
        console.log('Keys in the message object:', Object.keys(message))
        console.log(`Type of message.chat_id: ${typeof message.chat_id}`); // Check the type
        console.log(`Value of message.chat_id: ${message.chat_id}`); // Check the actual value
        
        for (const chat of this.chatStore.chats) {
          if (chat.id == message.chat_id) {
            console.log('message was added to chat messages')
            console.log(this.chatStore.chats[message.chat_id].messages)
            return this.chatStore.addMessageToChat(message.chat_id, message)
          }
        }
    }
  
    sendMessage(message) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
      } else {
        console.error('WebSocket is not open. Unable to send message.');
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
        this.isConnected = false;
      }
    }
  }
  

  export default WebSocketService;