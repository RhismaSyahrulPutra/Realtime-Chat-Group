// Room Options
import roomOptions from '../../constant/roomOptions';

function RoomSelector({ roomId, setRoomId }) {
  return (
    <div className="mb-6">
      <p className="text-gray-700 mb-2 font-medium">Pilih Room:</p>
      <div className="grid grid-cols-3 gap-3">
        {roomOptions.map(room => (
          <label
            key={room.id}
            className={`cursor-pointer border rounded-lg px-4 py-2 text-center transition 
              ${roomId === room.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-700 border-gray-300'}
              hover:border-indigo-400`}
          >
            <input
              type="radio"
              name="room"
              value={room.id}
              checked={roomId === room.id}
              onChange={() => setRoomId(room.id)}
              className="hidden"
            />
            {room.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RoomSelector;
