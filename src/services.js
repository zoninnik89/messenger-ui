import { useEffect } from 'react';
import { useStore } from "./store/useStore";
import WebSocketService from "./components/websocketservice/WebSocketService";

export function InitializeWebSocketService() {
    const { chatStore, userStore } = useStore();

    if (WebSocketService.instance) {
      console.log('WebSocketService is already initialized');
      return WebSocketService.instance; // Return the existing instance
    }

    // Create a new WebSocketService if it doesn't exist
    const websocketService = new WebSocketService(chatStore, userStore);

    if (!websocketService.isConnected && userStore.getUserID()) {
      websocketService.connect();
    }

    return websocketService;
}
