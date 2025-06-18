import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import JoinForm from '../components/JoinForm/JoinForm';
// Toast
import { toast } from 'react-hot-toast';

function JoinPage() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (username.trim() && roomId.trim()) {
      toast.success('Bergabung ke room...');
      navigate(`/chat/${roomId}`, { state: { username } });
    } else {
      toast.error('Isi username dan Room ID dulu!');
    }
  };

  return (
    <JoinForm
      username={username}
      roomId={roomId}
      setUsername={setUsername}
      setRoomId={setRoomId}
      onJoin={handleJoin}
    />
  );
}

export default JoinPage;
