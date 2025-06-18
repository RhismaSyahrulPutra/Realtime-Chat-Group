import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ChatMessages({ chat, username }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      <AnimatePresence initial={false}>
        {chat.map((msg, i) =>
          msg.system ? (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center text-sm italic my-2 px-3 py-1 rounded-lg w-fit mx-auto bg-black bg-opacity-10 text-gray-700"
            >
              {msg.msg}
            </motion.p>
          ) : (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: msg.sender === username ? 50 : -50,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`mb-3 flex ${
                msg.sender === username ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow
                  ${
                    msg.sender === username
                      ? 'bg-violet-500 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}
              >
                <div className="font-semibold mb-1">{msg.sender}</div>
                <div>{msg.msg}</div>
                <div className="text-right text-xs mt-1 text-gray-300">
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatMessages;
