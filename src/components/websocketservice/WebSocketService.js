

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
        this.reconnectAttempts = 0; // Track the number of reconnection attempts
        this.maxReconnectAttempts = 5; // Set a limit for retries
        this.reconnectDelay = 1000; // Initial delay in milliseconds
        this.reconnectTimeout = null; // To store the reconnect timeout ID
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
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
            console.log(`WebSocket connection established, status is ${this.isConnected}`);
        };
    
        this.ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const message = JSON.parse(event.data);
            if (message.type === 'ping') {
              console.log('Ping from backend received')
            } else {
              this.handleIncomingMessage(message);
            }
        };
    
        this.ws.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket connection closed');
            this.scheduleReconnect();
        };
    
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.scheduleReconnect(); // Handle errors by scheduling a reconnect
        };
    }
  
    handleIncomingMessage(message) {      
        if (this.chatStore.chats.some((chat) => chat.id === message.chat_id)) {
          console.log('message was added to chat messages');
          this.chatStore.addMessageToChat(message.chat_id, message);
          return
        }
        console.log(`Chat ID ${message.chat_id} was not found`);
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

      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout); // Clear any scheduled reconnect attempts
        this.reconnectTimeout = null;
      }
    }

    scheduleReconnect() {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.warn('Maximum reconnect attempts reached. Giving up.');
          return;
      }

      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts); // Exponential backoff
      this.reconnectAttempts += 1;
      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

      this.reconnectTimeout = setTimeout(() => {
          console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
          this.connect();
      }, delay);
    }
  }
  

  export default WebSocketService;