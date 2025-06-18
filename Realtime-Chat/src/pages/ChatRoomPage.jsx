import React from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';
// Components
import ChatRoom from '../components/ChatRoom/ChatRoom';

function ChatRoomPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username;

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return <ChatRoom username={username} roomId={roomId} />;
}

export default ChatRoomPage;
