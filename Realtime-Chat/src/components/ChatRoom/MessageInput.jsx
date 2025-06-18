import { Send } from 'lucide-react';

function MessageInput({ message, onChange, onSend }) {
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t flex items-center gap-2 bg-white">
      <input
        value={message}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Tulis pesan..."
        className="flex-1 px-4 py-2 ring-2 ring-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
      <button
        onClick={onSend}
        className="bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-full transition flex items-center justify-center"
        aria-label="Kirim"
      >
        <Send size={20} />
      </button>
    </div>
  );
}

export default MessageInput;
