import { makeAutoObservable } from 'mobx';

class WebSocketStore {
    ws = null;
    isConnected = false;
    reconnectAttempts = 0;
    maxReconnectAttempts = 5;
    reconnectDelay = 1000;
    reconnectTimeout = null;
    shouldReconnect = true;

    constructor(chatStore, userStore) {
        this.chatStore = chatStore;
        this.userStore = userStore;
        makeAutoObservable(this);
        console.log('WebSocket store created')
    }

    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('WebSocket connection already exists.');
            return;
        }

        const userToken = this.userStore.currentUser?.token;
        if (!userToken) {
            console.error('User must be logged in to establish WebSocket connection');
            return;
        }

        this.ws = new WebSocket(`ws://localhost:3002/ws?token=${userToken}`);

        this.ws.onopen = () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
            console.log('WebSocket connection established');
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'ping') {
                console.log('Ping from backend received');
                this.sendPong(); // Отправляем pong в ответ на ping
            } else {
                console.log('User message from backend received');
                this.handleIncomingMessage(message);
            }
        };

        this.ws.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket connection closed');
            if (this.shouldReconnect) {
                this.scheduleReconnect();
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            if (this.shouldReconnect) {
                this.scheduleReconnect();
            }
        };
    }

    handleIncomingMessage(message) {
        console.log('handling incoming message', message)
        for (const chat of this.chatStore.chats) {
            if (chat.id === message.chat_id) {
                console.log('message saved in store', message)
                this.chatStore.addMessageToChat(message.chat_id, message);
                return
            }  
        }
        console.log(`Chat ID ${message.chat_id} not found`);
    }

    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(
                JSON.stringify(
                    {
                        type: "user",
                        chat_id: String(this.chatStore.selectedChat.get().id),
                        message_text: message,
                    }
                )
            );
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    }

    sendPong() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type: 'pong' })); // Sending pong in response to ping from server
            console.log('Pong sent to backend');
        } else {
            console.error('WebSocket is not open. Unable to send pong.');
        }
    }

    disconnect() {
        this.shouldReconnect = false;
        if (this.ws) {
            this.ws.close();
            this.isConnected = false;
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }

    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn('Maximum reconnect attempts reached. Giving up.');
            return;
        }

        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
        this.reconnectAttempts += 1;
        console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

        this.reconnectTimeout = setTimeout(() => {
            console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
            this.connect();
        }, delay);
    }
}

export default WebSocketStore;