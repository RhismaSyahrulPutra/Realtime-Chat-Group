// Components
import UsernameInput from './UsernameInput';
import RoomSelector from './RoomSelector';

function JoinForm({ username, roomId, setUsername, setRoomId, onJoin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Masuk ke Chat Room
        </h2>

        <UsernameInput username={username} setUsername={setUsername} />
        <RoomSelector roomId={roomId} setRoomId={setRoomId} />

        <button
          onClick={onJoin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default JoinForm;
