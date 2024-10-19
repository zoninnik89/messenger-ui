import { useEffect } from 'react';
import { useStore } from "./store/useStore";
import WebSocketService from "./components/websocketservice/WebSocketService";

export function useWebSocketService() {
    const { chatStore, userStore } = useStore();

    useEffect(() => {
        const websocketService = new WebSocketService(chatStore, userStore);
        userStore.websocketService = websocketService;
    
        // Connect WebSocket when user logs in
        if (userStore.getUserID() != '') {
          websocketService.connect();
        }
    
        // Clean up WebSocket connection when the component unmounts
        return () => {
          websocketService.disconnect();
          userStore.websocketService = null;
        };
      }, [chatStore, userStore]);
}
