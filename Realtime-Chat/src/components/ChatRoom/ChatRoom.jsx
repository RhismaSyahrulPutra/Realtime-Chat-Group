import { useEffect, useState } from 'react';
import socket from '../../socket';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import TypingStatus from './TypingStatus';
import MessageInput from './MessageInput';

function ChatRoom({ username, roomId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const handleNewMessage = msgObj => setChat(prev => [...prev, msgObj]);
    const handleSystemMessage = msg =>
      setChat(prev => [...prev, { system: true, msg }]);
    const handleTyping = ({ username, isTyping }) =>
      setTypingStatus(isTyping ? `${username} sedang mengetik...` : '');
    const handleStopTyping = () => setTypingStatus('');
    const handleUserOnline = user =>
      setOnlineUsers(prev => Array.from(new Set([...prev, user])));
    const handleUserOffline = user =>
      setOnlineUsers(prev => prev.filter(u => u !== user));
    const handleUsersInRoom = users => setOnlineUsers(users);

    // 1️⃣ Pasang semua listener terlebih dahulu
    socket.on('newMessage', handleNewMessage);
    socket.on('userJoined', handleSystemMessage);
    socket.on('userLeft', handleSystemMessage);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);
    socket.on('userOnline', handleUserOnline);
    socket.on('userOffline', handleUserOffline);
    socket.on('usersInRoom', handleUsersInRoom);

    socket.emit('joinRoom', { roomId, username });

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('userJoined', handleSystemMessage);
      socket.off('userLeft', handleSystemMessage);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
      socket.off('userOnline', handleUserOnline);
      socket.off('userOffline', handleUserOffline);
      socket.off('usersInRoom', handleUsersInRoom);
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const timestamp = new Date().toLocaleTimeString();
    socket.emit('sendMessage', { roomId, message, timestamp });
    setMessage('');
    socket.emit('stopTyping', { roomId });
  };

  const handleTyping = e => {
    setMessage(e.target.value);
    socket.emit('typing', { roomId, isTyping: true });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit('stopTyping', { roomId });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-full max-w-2xl h-[90vh] rounded-2xl shadow-xl overflow-hidden">
        <ChatHeader roomId={roomId} onlineCount={onlineUsers.length} />
        <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 border-b">
          Online: {onlineUsers.join(', ')}
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatMessages chat={chat} username={username} />
        </div>

        <TypingStatus status={typingStatus} />
        <MessageInput
          message={message}
          onChange={handleTyping}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

export default ChatRoom;
