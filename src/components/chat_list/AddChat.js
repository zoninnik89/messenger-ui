const AddChat = observer(() => {
    const { chatStore } = useStore();
    const [chatName, setChatName] = React.useState('');
  
    const handleAddChat = () => {
      chatStore.addChat({ name: chatName });
      setChatName('');
    };
  
    return (
      <div>
        <input
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="New chat name"
        />
        <button onClick={handleAddChat}>Add Chat</button>
      </div>
    );
});
  
export default AddChat;