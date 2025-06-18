import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

function ChatHeader({ roomId, onlineCount }) {
  const navigate = useNavigate();

  const handleLeave = () => {
    socket.emit('manualLeave', { roomId });
    navigate('/');
  };

  return (
    <div className="relative bg-violet-500 text-white px-4 py-4 flex items-center justify-between">
      <button
        onClick={handleLeave}
        className="hover:bg-violet-600 p-2 rounded-full transition"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
        Room: {roomId}
      </div>
      <div className="text-sm flex items-center gap-1">
        <span className="relative inline-flex">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping absolute top-0 left-0"></span>
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full relative"></span>
        </span>
        <span className="font-medium">{onlineCount} online</span>
      </div>
    </div>
  );
}

export default ChatHeader;
